import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Score, ScoreDocument } from './score-manager.dto';
import { Model } from 'mongoose';
import { DbParserService } from '@sigrh/db-parser';
import axios from 'axios';

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
      mean: (Math.round((sums.sum / sums.coefSum) * 100) / 100).toFixed(2),
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
    const scores = (await Promise.all(promises)).filter(
      (score) => score.sum > 0,
    );
    if (!sorted)
      return scores.map((score) => ({ ...score, sum: score.sum.toFixed(2) }));
    if (sorted && !reverse)
      return scores
        .sort((a, b) => Number(a.mean) - Number(b.mean))
        .map((score) => ({ ...score, sum: score.sum.toFixed(2) }));
    if (sorted && reverse)
      return scores
        .sort((a, b) => -Number(a.mean) + Number(b.mean))
        .map((score) => ({ ...score, sum: score.sum.toFixed(2) }));
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
        $set: { total: { $multiply: ['$value', '$field_.coefficient'] } },
      },
      {
        $group: {
          _id: { candidate: '$candidate' },
          grades: {
            $push: {
              value: '$value',
              coef: '$field_.coefficient',
              field: '$field',
            },
          },
          total: { $sum: '$total' },
          coefSum: { $sum: '$field_.coefficient' },
        },
      },
      {
        $set: {
          mean: { $divide: ['$total', '$coefSum'] },
          candidate: '$_id.candidate',
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

  async correction() {
    const scores = await this.model.find({});
    const _scores = scores.filter((score) => score.candidate.length < 12);
    // const p = [];
    // for (const _s of _scores) {
    //   const response = await axios.get(
    //     `http://localhost:7002/api/v1/qrcodes/${_s.candidate}`,
    //   );
    //   p.push(response.data);
    // }

    return _scores;
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

  async getScoreByFieldAndCandidate(field: string, candidate: string) {
    const _result = await this.model.findOne({ candidate, field });
    console.log(_result);
    return this.dbParser.parseData(_result);
  }

  async removeScore(id: string) {
    return await this.model.remove({ _id: id });
  }

  async updateEnseignants() {
    await this.model.updateMany(
      { exam: '624d808282b473d0c6369331', field: '6278219b726f06e793c433e1' },
      { field: '627820a7726f06e793c433cf' },
    );
  }
}
