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
    const pipeline: any[] = [
      { $match: { exam, candidate } },
      {
        $lookup: {
          from: 'fields',
          localField: 'field',
          foreignField: '_id',
          as: 'field_',
        },
      },
      { $unwind: '$field_' },
      {
        $set: {
          total: { $multiply: ['$value', '$field_.coefficient'] },
          optTotal: {
            $cond: {
              if: { $eq: ['$isOptional', true] },
              then: 0,
              else: { $multiply: ['$value', '$field_.coefficient'] },
            },
          },
          optCoef: {
            $cond: {
              if: { $eq: ['$isOptional', true] },
              then: 0,
              else: '$field_.coefficient',
            },
          },
        },
      },
      {
        $group: {
          _id: { candidate: '$candidate' },
          grades: {
            $push: {
              value: '$value',
              coef: '$field_.coefficient',
              field: '$field',
              isOptional: '$isOptional',
            },
          },
          total: { $sum: '$total' },
          optTotal: { $sum: '$optTotal' },
          coefSum: { $sum: '$field_.coefficient' },
          optCoefSum: { $sum: '$optCoef' },
        },
      },
      {
        $set: {
          mean_: { $divide: ['$total', '$coefSum'] },
          optMean: { $divide: ['$optTotal', '$optCoefSum'] },
          candidate: '$_id.candidate',
        },
      },
      {
        $set: {
          mean: {
            $cond: {
              if: { $gte: ['$optMean', '$mean_'] },
              then: '$optMean',
              else: '$mean_',
            },
          },
        },
      },
      { $project: { _id: 0 } },
    ];
    const result = await this.model.aggregate(pipeline);
    return result.length > 0 ? result[0] : null;
  }

  async getAllCandidates(exam: string) {
    console.log(exam);
    const _scores = await this.model.find({ exam });
    const candidates = {};
    for (const score of _scores) {
      if (!(score.candidate in candidates)) candidates[score.candidate] = '';
    }
    return Object.keys(candidates);
  }

  async computeExamScore(exam: string, sorted = true, reverse = false) {
    const pipeline: any[] = [
      { $match: { exam } },
      {
        $lookup: {
          from: 'fields',
          localField: 'field',
          foreignField: '_id',
          as: 'field_',
        },
      },
      { $unwind: '$field_' },
      {
        $set: {
          total: { $multiply: ['$value', '$field_.coefficient'] },
          optTotal: {
            $cond: {
              if: { $eq: ['$isOptional', true] },
              then: 0,
              else: { $multiply: ['$value', '$field_.coefficient'] },
            },
          },
          optCoef: {
            $cond: {
              if: { $eq: ['$isOptional', true] },
              then: 0,
              else: '$field_.coefficient',
            },
          },
        },
      },
      {
        $group: {
          _id: { candidate: '$candidate' },
          grades: {
            $push: {
              value: '$value',
              coef: '$field_.coefficient',
              field: '$field',
              isOptional: '$isOptional',
            },
          },
          total: { $sum: '$total' },
          optTotal: { $sum: '$optTotal' },
          coefSum: { $sum: '$field_.coefficient' },
          optCoefSum: { $sum: '$optCoef' },
        },
      },
      {
        $set: {
          mean_: { $divide: ['$total', '$coefSum'] },
          optMean: { $divide: ['$optTotal', '$optCoefSum'] },
          candidate: '$_id.candidate',
        },
      },
      {
        $set: {
          mean: {
            $cond: {
              if: { $gte: ['$optMean', '$mean_'] },
              then: '$optMean',
              else: '$mean_',
            },
          },
        },
      },
      { $project: { _id: 0 } },
    ];
    if (sorted) {
      pipeline.push({ $sort: { mean: reverse ? -1 : 1 } });
    }
    const result = await this.model.aggregate(pipeline);
    return result;
  }

  async save(payload: Score) {
    try {
      const { field, candidate, exam, extras, isOptional } = payload;
      const previousScore = await this.model.findOne({
        field,
        candidate,
        exam,
        extras,
        isOptional,
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

  async getScoreByFieldAndCandidate(field: string, candidate: string) {
    const _result = await this.model.findOne({ candidate, field });
    console.log(_result);
    return this.dbParser.parseData(_result);
  }

  async removeScore(id: string) {
    return await this.model.remove({ _id: id });
  }
}
