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

@Injectable()
export class QuestionService extends RepositoryService<Question> {
  constructor(
    @InjectModel(Question.name)
    protected readonly model: Model<QuestionDocument>,
    protected readonly dbParser: DbParserService,
    private readonly score: ScoreService,
    private readonly candidateService: CandidatService,
    private ws: WsGateway,
  ) {
    super(model, dbParser);
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

  async getResults(exam: string) {
    const results = await this.score.getResults(exam, 'DESC');
    const result = [];

    for (const score of results) {
      if (score.scores.length > 0) {
        const candidate = await this.candidateService.one(
          score.scores[0].candidate,
        );
        result.push({ ...score, candidate });
      }
    }

    return result;
  }
}
