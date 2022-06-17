import { DepartementService } from './../departement/departement.service';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RepositoryService } from '@sigrh/repository';
import { Question, QuestionDocument } from './question.dto';
import { Model } from 'mongoose';
import { DbParserService } from '@sigrh/db-parser';
import { ScoreService } from '../consumers/score/score.service';
import { ScorePayload } from '../consumers/score/score.types';
import { CandidatService } from '../candidat/candidat.service';
import { WsGateway } from '@sigrh/websocket';
import { WsEvents } from '../utils';
import { ReportService } from '../consumers/report/report.service';

@Injectable()
export class QuestionService extends RepositoryService<Question> {
  constructor(
    @InjectModel(Question.name)
    protected readonly model: Model<QuestionDocument>,
    protected readonly dbParser: DbParserService,
    private readonly score: ScoreService,
    private readonly candidateService: CandidatService,
    private depService: DepartementService,
    private report: ReportService,
    private ws: WsGateway,
  ) {
    super(model, dbParser);
  }

  async downloadPdf(data: string, format: any = {}) {
    return await this.report.downloadPdf(data, format);
  }

  async downloadXlsx(data: Record<string, string>[]) {
    return await this.report.downloadXlsx(data);
  }

  async getAll(exam: string) {
    return await this.score.getFields(exam);
  }

  async create(question: Question) {
    return await this.score.addField({
      coefficient: 1,
      exam: question.exam,
      label: question.label,
    });
  }

  async one(id: string) {
    return await this.score.getField(id);
  }

  async findByNums(exam: string, ids: string[]) {
    const fields = await this.score.getFields(exam);
    console.log(fields);
    return fields.filter((field: any, index: number) =>
      ids.map((id: string) => Number(id)).includes(index + 1),
    );
  }

  async createScore(score: ScorePayload) {
    const r = await this.score.insertScore(score);
    const candidateScore = await this.score.getCandidateScore(
      score.exam,
      score.candidate,
    );

    this.ws.notify({
      event: WsEvents.NEW_SCORE_ADDED,
      cb: () => {
        return { score, candidateScore };
      },
    });

    return r;
  }

  async remove(id: string) {
    return this.score.removeField(id);
  }

  async getResults(
    exam: string,
    departement: string = null,
    limit: number = -1,
  ) {
    const results_ = await this.score.getResults(exam, 'DESC');
    console.log('processing', results_.length);
    const result = [];
    let results = [...results_];

    if (limit > 0) {
      results = results.slice(0, limit);
    }

    for (const score of results) {
      const candidate = await this.candidateService.one(score.candidate);
      const departement_ = await this.depService.one(candidate.departement);
      if (
        !departement ||
        departement === '*' ||
        String(departement_.id) === departement
      )
        result.push({
          ...score,
          candidate: {
            ...candidate,
            departement: departement_,
          },
        });
    }

    return result;
  }
}
