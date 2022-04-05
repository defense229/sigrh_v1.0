import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DbParserService } from '@sigrh/db-parser';
import { Model } from 'mongoose';
import { HandleHttpException } from '../decorators';
import { Exam } from '../exam/exam.dto';

@Injectable()
export class RepositoryService<T> {
  constructor(
    @InjectModel(Exam.name)
    protected readonly model: Model<any>,
    protected dbParser: DbParserService,
  ) {}

  @HandleHttpException()
  async create(data: T) {
    const _result = await this.model.create(data);
    return this.dbParser.parseData(_result);
  }

  @HandleHttpException()
  async one(id: string) {
    const _result = await this.model.findById(id);
    return this.dbParser.parseData(_result);
  }

  @HandleHttpException()
  async update(id: string, data: Partial<T>) {
    await this.model.findOneAndUpdate({ id }, data, { new: true });
    const _result = await this.model.findById(id);

    return this.dbParser.parseData(_result);
  }

  @HandleHttpException()
  async archive(id: string) {
    await this.update(id, { enabled: false } as any);
    return { statusCode: HttpStatus.OK };
  }

  @HandleHttpException()
  async find(query: Record<string, any>) {
    const _result = await this.model.find({ enabled: true, ...query });
    return _result.map((item) => this.dbParser.parseData(item));
  }

  @HandleHttpException()
  async findOne(query: Record<string, any>) {
    const _result = await this.model.findOne({ enabled: true, ...query });
    return this.dbParser.parseData(_result);
  }
}
