import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Score, ScoreDocument } from './score-manager.dto';
import { Model } from 'mongoose';
import { DbParserService } from '@sigrh/db-parser';

@Injectable()
export class ScoreManagerService {
  constructor(
    @InjectModel(Score.name)
    private readonly model: Model<ScoreDocument>,
    private dbParser: DbParserService,
  ) {}

  async all() {
    const _result = await this.model.find({});
    return _result.map((item: Score) => this.dbParser.parseData(item));
  }

  async findByExam(exam: string) {
    const _result = await this.model.find({ exam });
    return _result.map((item: Score) => this.dbParser.parseData(item));
  }

  async countByExam(exam: string, field = 'ALL') {
    console.log(exam, field);
    let result: number;
    if (field !== 'ALL') {
      result = await this.model.countDocuments({ exam, field });
    }
    result = await this.model.countDocuments({ exam });
    return result;
  }

  async getCandidateScore(exam: string, candidate: string) {
    const _result = await this.model
      .find({ exam, candidate })
      .populate('field');
    const _computed = _result.map((item: any) => {
      const result = {
        value: item.value,
        candidate: item.candidate,
        coefficient: item.field.coefficient,
        field: item.field.label,
        poundValue: item.value * item.field.coefficient,
        extras: item.extras,
      };
      return result;
    });
    const sums = _computed.reduce(
      (acc, cur) => {
        return {
          sum: acc.sum + cur.value * cur.coefficient,
          coefSum: acc.coefSum + cur.coefficient,
        };
      },
      { sum: 0, coefSum: 0 },
    );
    return {
      scores: _computed,
      ...sums,
      mean: Math.round((sums.sum / sums.coefSum) * 100) / 100,
    };
  }

  async getAllCandidates() {
    const _scores = await this.model.find({});
    const candidates = {};
    for (const score of _scores) {
      if (!(score.candidate in candidates)) candidates[score.candidate] = '';
    }
    return Object.keys(candidates);
  }

  async getExamsScores(exam: string, sorted = true, reverse = false) {
    const candidates = await this.getAllCandidates();
    const promises = candidates.map((candidate) =>
      this.getCandidateScore(exam, candidate),
    );
    const scores = await Promise.all(promises);
    if (!sorted) return scores;
    if (sorted && !reverse) return scores.sort((a, b) => a.sum - b.sum);
    if (sorted && reverse) return scores.sort((a, b) => -a.sum + b.sum);
  }

  async save(payload: Score) {
    try {
      const { field, candidate, exam, extras } = payload;
      const previousScore = await this.model.findOne({
        field,
        candidate,
        exam,
        extras,
      });
      if (!previousScore)
        return this.dbParser.parseData(await this.model.create(payload));
      return this.dbParser.parseData(
        await this.model.updateOne(
          { _id: previousScore.id },
          { value: payload.value },
        ),
      );
    } catch (error) {
      throw new HttpException(
        { statusCode: HttpStatus.NOT_ACCEPTABLE, message: error.message },
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
  }
}
