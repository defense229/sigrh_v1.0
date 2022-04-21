import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Exam, ExamDocument } from './exam.dto';
import { Model } from 'mongoose';
import { DbParserService } from '@sigrh/db-parser';
import { RepositoryService } from '../repository/repository.service';
import { CenterService } from './center/center.service';
import { CandidatService } from '../candidat/candidat.service';
import { ReportService } from '../consumers/report/report.service';
import { HandleHttpException } from '../decorators';
import { RepartitionService } from './repartition/repartition.service';
import { ScoreService } from '../consumers/score/score.service';
import { customAlphabet } from 'nanoid';
import { getDepartementCode, WsEvents } from '../lib';
import { hash } from 'bcrypt';
import { QrcodeService } from '../consumers/qrcode/qrcode.service';
import { WsGateway } from '@sigrh/websocket';
import {
  ExamRepartitionStatus,
  examSteps,
  ExamStepStatus,
  ISimulationPayload,
} from './exam.types';
import { ScorePayload } from '../consumers/score/score.types';
import { createRunner } from '@sigrh/runner';

@Injectable()
export class ExamService extends RepositoryService<Exam> {
  constructor(
    @InjectModel(Exam.name)
    protected readonly model: Model<ExamDocument>,
    protected dbParser: DbParserService,
    private centerService: CenterService,
    private candidatService: CandidatService,
    private report: ReportService,
    private repartitionService: RepartitionService,
    private scoreService: ScoreService,
    private qrcodeService: QrcodeService,
    private readonly ws: WsGateway,
    private score: ScoreService,
  ) {
    super(model, dbParser);
    this.searchFields = ['label'];
  }

  @HandleHttpException()
  async one(id: string) {
    const _result = await this.model.findById(id);
    return this.dbParser.parseData(_result);
  }

  async createRepartition(id: string) {
    await this.centerService.update(id, {
      repartitionStatus: ExamRepartitionStatus.PROCESSING,
    });
    const center = await this.centerService.one(id);
    const fields = await this.scoreService.getFields(center.exam);
    if (!fields || fields.length === 0) {
      return new HttpException(
        {
          statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
          message:
            "Impossible d'effectuer la répartition, aucune matière trouvée pour cet examen.",
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const [departement, departement2] = center.departement.split('-');

    const depCode: number = getDepartementCode(departement);

    const starts = fields.map((field: any) => {
      return {
        shortName: field.label.slice(0, 3).toUpperCase(),
        startValue: Number(customAlphabet('123456789')(3)),
        field,
      };
    });

    return await this.centerService.setRepartition(
      center,
      async (data: any) => {
        if (!data.candidates && !data.rooms) {
          return new HttpException(
            {
              statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
              message:
                "Inpossible d'effectuer la répartition, arguments insuffisants",
            },
            HttpStatus.UNPROCESSABLE_ENTITY,
          );
        }

        // TODO: get all candidates who are succeed sport phase exam
        // TODO: sort by name ASC
        const candidates: any[] = (
          await this.candidatService.filter({
            sportAccept: true,
            departement: new RegExp(
              `(${departement}|${departement2 ? departement2 : ''})`,
            ),
            exam: center.exam,
          })
        )
          .map((c) => {
            return {
              numero: c.numero,
              nom: c.nom,
              prenom: c.prenom,
              departement: c.departement,
              sexe: c.sexe,
              dateNaissance: c.dateNaissance,
              id: c._id ? c._id : c.id,
            };
          })
          .sort((c1, c2) =>
            (c1.nom + c1.prenom).trim() < (c2.nom + c2.prenom).trim() ? -1 : 1,
          );

        let i = 0;
        const total = candidates.length + 1;
        const percent = (value: number) => Math.round((value / total) * 100);

        for (const candidate of candidates) {
          const qrcodes = {};
          const k = ++i;
          for (const el of starts) {
            const data = await hash(`${candidate.id}-${el.field.id}`, 1);
            const tag = `${depCode}${el.shortName}${el.startValue + k}`;
            const qrcode = (await this.qrcodeService.create({ data, tag }))
              .dataUrl;
            qrcodes[el.field.id] = { tag, qrcode };
          }
          candidate.qrcodes = qrcodes;
          const percentage = percent(k);
          console.log('Percentage: ', percentage, '%');
          this.ws.notify({
            event: WsEvents.REPARTITION_PROGRESS,
            cb: () => ({ id: data.id, percentage }),
          });
        }

        const result = {};
        if (data.candidates && data.candidates > 0) {
          // TODO: if candidates is provided, group by number of candidates (rooms)
          // if centers if provided, group by number of centers
          const _candidates = [];
          for (
            let i = 0;
            i < Math.ceil(candidates.length / data.candidates);
            ++i
          ) {
            const start = i * data.candidates;
            const _candidates_row = candidates.slice(
              start,
              start + data.candidates,
            );
            _candidates.push(_candidates_row);
          }

          const len = Math.ceil(_candidates.length / data.centers);
          await this.centerService.update(id, {
            rooms: len,
          });
          for (let i = 0; i < data.centers; ++i) {
            const start = i * len;
            result[`Centre ${i + 1}`] = _candidates.slice(start, start + len);
          }
        } else {
          // TODO: if not candidates provided, check if centers and rooms are provided
          // if ok, group by centers and then by rooms
          // else throw error
          const len = Math.ceil(candidates.length / data.centers);
          if (data.rooms && data.rooms > 0) {
            for (let i = 0; i < data.centers; ++i) {
              const start = i * len;
              result[`Centre ${i + 1}`] = candidates.slice(start, start + len);
            }

            await this.centerService.update(id, {
              candidates: Math.ceil(
                (Object.values(result)[0] as Array<any>).length / data.rooms,
              ),
            });

            for (const c in result) {
              const list = result[c];
              const new_list = [];
              const _len = Math.ceil(list.length / data.rooms);
              for (let i = 0; i < _len; ++i) {
                new_list.push(list.slice(i * _len, i * _len + _len));
              }
              result[c] = new_list;
            }
          } else {
            return new HttpException(
              {
                statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
                message:
                  "Inpossible d'effectuer la répartition, arguments insuffisants",
              },
              HttpStatus.UNPROCESSABLE_ENTITY,
            );
          }
        }

        const oldRepartition = await this.repartitionService.findOne({
          exam: data.exam,
          departement: data.departement,
        });
        if (!oldRepartition) {
          this.repartitionService.create({
            exam: data.exam,
            departement: data.departement,
            repartition: result,
          });
        } else {
          this.repartitionService.update(oldRepartition.id, {
            repartition: result,
          });
        }

        return result;
      },
    );
  }

  async getRepartition(exam: string, departement: string) {
    const _repartition = await this.repartitionService.findOne({
      exam,
      departement,
    });
    if (_repartition) return _repartition.repartition;
    return null;
  }

  async downloadPdf(data: string) {
    return await this.report.downloadPdf(data);
  }

  async downloadXlsx(data: Record<string, string>[]) {
    return await this.report.downloadXlsx(data);
  }

  async activeStep(id: string, step: string) {
    const _step = { ...examSteps };
    _step[step] = ExamStepStatus.ACTIVE;
    return await this.model.updateOne({ id }, { ..._step });
  }

  async gotoNextStep(id: string) {}

  async addScore(payload: ScorePayload) {
    await this.score.insertScore(payload);
    const task = createRunner({
      name: 'add-score',
      fn: async () => {
        const count = await this.countInsertedScores(
          payload.exam,
          payload.field,
        );
        this.ws.notify({
          event: WsEvents.ADD_SCORE,
          cb: () => count,
        });
      },
    });
    task.run();
    return;
  }

  async getScoreResults(exam: string, sort: 'ASC' | 'DSC' = 'DSC') {
    return await this.score.getResults(exam, sort);
  }

  async countInsertedScores(exam: string, field: string) {
    return await this.score.countInsertedScores(exam, field);
  }

  async simulate(
    exam: string,
    sort: 'ASC' | 'DSC' = 'DSC',
    payload: ISimulationPayload,
  ) {
    const results = this.getScoreResults(exam, sort);
    // TODO: make simulations
  }
}
