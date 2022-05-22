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
import { QrcodeService } from '../consumers/qrcode/qrcode.service';
import { WsGateway } from '@sigrh/websocket';
import { ExamRepartitionStatus, examSteps, ExamStepStatus } from './exam.types';
import { ScorePayload } from '../consumers/score/score.types';
import { createRunner } from '@sigrh/runner';
import { ExamSetting } from './setting/setting.dto';
import { ExamQuotaUnit } from './setting/setting.types';
import { SettingService } from './setting/setting.service';

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
    private settingService: SettingService,
  ) {
    super(model, dbParser);
    this.searchFields = ['label'];
  }

  @HandleHttpException()
  async one(id: string) {
    const _result = await this.model.findById(id);
    return this.dbParser.parseData(_result);
  }

  async getField(id: string) {
    return await this.score.getField(id);
  }

  async createRepartition(id: string) {
    await this.centerService.update(id, {
      repartitionStatus: ExamRepartitionStatus.PROCESSING,
    });
    const center = await this.centerService.one(id);
    const fields = await this.scoreService.getFields(center.exam);
    console.log(fields, center);
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
            const data = candidate.id;
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

  async downloadPdf(data: string, format: any = {}) {
    return await this.report.downloadPdf(data, format);
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

  async getScoreResults(exam: string, sort: 'ASC' | 'DESC' = 'DESC') {
    const results = await this.score.getResults(exam, sort);
    const candidates = await this.candidatService.find({
      exam,
      sportAccept: true,
    });
    const _results = [];

    for (const result of results) {
      const candidate = candidates.find(
        (c) => String(c.id) === result.candidate,
      );
      if (candidate) {
        _results.push({
          ...result,
          candidate,
        });
      }
    }

    return _results;
  }

  async getSimulationResult(params: ExamSetting) {
    const {
      considerAllField,
      exam,
      quotaUnit,
      take,
      wmQuota,
      wmQuotaUnit,
      isDefinitive,
    } = params;

    if (!isDefinitive) {
      return await this.makeSimulation(
        exam,
        considerAllField,
        take,
        wmQuota,
        quotaUnit,
        wmQuotaUnit,
      );
    } else {
      const setting = await this.settingService.getSetting(exam);
      if (setting.result) return setting.result;
      else {
        const result = await this.makeSimulation(
          exam,
          considerAllField,
          take,
          wmQuota,
          quotaUnit,
          wmQuotaUnit,
        );
        await this.settingService.updateSetting(exam, { result });
        return result;
      }
    }
  }

  private async makeSimulation(
    exam: string,
    considerAllField: boolean,
    take: number,
    wmQuota: number,
    quotaUnit: ExamQuotaUnit,
    wmQuotaUnit: ExamQuotaUnit,
  ) {
    const nbrFields = (await this.score.getFields(exam)).length;
    console.log('[nbr of fields]:', nbrFields);
    const results = await this.getScoreResults(exam, 'DESC');
    const len = results.length;
    console.log('[nbr of result]:', len);
    let _results: any;

    if (considerAllField) {
      _results = results.filter((r: any) => r.grades.length === nbrFields);
    }

    const totalWoman = await this.candidatService.countAcceptedWomanByExam(
      exam,
    );

    let totalToTake = Number(take),
      wmTotalToTake = Number(wmQuota);
    if (quotaUnit === ExamQuotaUnit.PERCENT) {
      totalToTake = Math.ceil((len * take) / 100);
    }

    if (wmQuotaUnit === ExamQuotaUnit.PERCENT) {
      wmTotalToTake = Math.ceil((totalToTake * wmQuota) / 100);
    }

    const fWmToTake = Math.min(wmTotalToTake, totalWoman);
    const fmToTake = totalToTake - fWmToTake;
    console.log('[total to take]:', totalToTake);
    console.log('[total of women to take]:', wmTotalToTake);
    console.log('[total of women available]:', totalWoman);
    console.log('[total of women will take]:', fWmToTake);
    console.log('[total of men will take]:', fmToTake);

    const _firstPass = _results.slice(0, totalToTake);
    const r = wmQuota
      ? this.handleWomenQuota(_firstPass, fWmToTake, fmToTake, _results)
      : _firstPass;
    const stats = this.generateSimulationStats(r);
    console.log({ values: r, stats });
    return { values: r, stats };
  }

  handleWomenQuota(results: any[], wQuota: number, mQuota: number, all: any[]) {
    const nbrOfWm = results.filter((r: any) => r.candidate.sexe === 'F').length;
    console.log(nbrOfWm, wQuota);
    if (nbrOfWm >= wQuota) return results;
    let result = [];
    for (let i = 0, c = 0; c < wQuota; i++) {
      if (all[i].candidate.sexe === 'F') {
        result.push(all[i]);
        c++;
      }
    }

    for (let i = 0, c = 0; c < mQuota; i++) {
      if (all[i].candidate.sexe === 'H') {
        result.push(all[i]);
        c++;
      }
    }

    result = result.sort((a: any, b: any) => b.mean - a.mean);

    return result;
  }

  generateSimulationStats(results: any[]) {
    const stats = {};
    for (const r of results) {
      if (r.candidate.sexe in stats) {
        stats[r.candidate.sexe]++;
      } else {
        stats[r.candidate.sexe] = 1;
      }
      if (r.candidate.departement in stats) {
        stats[r.candidate.departement].total++;
        if (r.candidate.sexe === 'H') stats[r.candidate.departement].h++;
        if (r.candidate.sexe === 'F') stats[r.candidate.departement].f++;
      } else {
        stats[r.candidate.departement] = {
          total: 1,
          h: r.candidate.sexe === 'H' ? 1 : 0,
          f: r.candidate.sexe === 'F' ? 1 : 0,
        };
      }
    }
    return stats;
  }

  async countInsertedScores(exam: string, field: string) {
    return await this.score.countInsertedScores(exam, field);
  }
}
