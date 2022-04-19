import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DbParserService } from '@sigrh/db-parser';
import { HandleHttpException } from '@sigrh/decorators';
import { Model } from 'mongoose';
import { Repository } from './repository.dto';

@Injectable()
export class RepositoryService<T> {
  private searcher = {};
  constructor(
    @InjectModel(Repository.name)
    protected readonly model: Model<any>,
    protected dbParser: DbParserService,
  ) {
    this.searchFields = [];
  }

  set searchFields(fields: string[]) {
    this.searcher = {};
    for (const field of fields) {
      this.searcher[field] = '';
    }
  }

  parsedSearchFields(search: string) {
    const result = [];
    for (const key in this.searcher) {
      result.push({ [key]: !search ? /.+/ : new RegExp(search, 'i') });
    }
    return { $or: result };
  }

  @HandleHttpException()
  async all(
    limit: number = 10,
    skip: number = 0,
    search: string = undefined,
    query: any = {},
    populate?: 'string' | string[],
  ) {
    const total = await this.model.countDocuments({
      enabled: true,
      ...this.parsedSearchFields(search),
      ...query,
    });
    let _result: any;
    if (populate) {
      _result = await this.model
        .find({ enabled: true, ...this.parsedSearchFields(search), ...query })
        .populate(populate)
        .skip(skip)
        .limit(limit);
    } else {
      _result = await this.model
        .find({ enabled: true, ...this.parsedSearchFields(search), ...query })
        .skip(skip)
        .limit(limit);
    }
    return {
      values: _result.map((item) => this.dbParser.parseData(item)),
      total,
    };
  }

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
    console.log(data);
    await this.model.findOneAndUpdate({ _id: id }, data, { new: true });
    const _result = await this.model.findById(id);

    return this.dbParser.parseData(_result);
  }

  @HandleHttpException()
  async archive(id: string) {
    await this.update(id, { enabled: false } as any);
    return { statusCode: HttpStatus.OK };
  }

  @HandleHttpException()
  async find(query: Record<string, any>, populate?: 'string' | string[]) {
    console.log('finding');
    let _result;
    if (populate) {
      console.log(populate);
      _result = await this.model
        .find({ enabled: true, ...query })
        .populate(populate);
      console.log(_result);
    } else _result = await this.model.find({ enabled: true, ...query });
    return _result.map((item) => this.dbParser.parseData(item));
  }

  @HandleHttpException()
  async findOne(query: Record<string, any>) {
    const _result = await this.model.findOne({ enabled: true, ...query });
    return this.dbParser.parseData(_result);
  }

  @HandleHttpException()
  async count(query: Record<string, any>) {
    return await this.model.countDocuments({ ...query, enabled: true });
  }
}
