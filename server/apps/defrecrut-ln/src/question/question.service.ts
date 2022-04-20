import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RepositoryService } from '@sigrh/repository';
import { Question, QuestionDocument } from './question.dto';
import { Model } from 'mongoose';
import { DbParserService } from '@sigrh/db-parser';
import { ScoreService } from '../consumers/score/score.service';
import { ScorePayload } from '../consumers/score/score.types';
import { IField } from '../../../score-manager/src/field/field.type';

@Injectable()
export class QuestionService extends RepositoryService<Question> {
  constructor(
    @InjectModel(Question.name)
    protected readonly model: Model<QuestionDocument>,
    protected readonly dbParser: DbParserService,
    private readonly score: ScoreService,
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
    return fields.filter((field: IField, index: number) =>
      ids.map((id: string) => Number(id)).includes(index + 1),
    );
  }

  async createScore(score: ScorePayload) {
    return await this.score.insertScore(score);
  }

  async remove(id: string) {
    return this.score.removeField(id);
  }

  async getResults(exam: string) {
    return await this.score.getResults(exam, 'ASC');
  }
}
