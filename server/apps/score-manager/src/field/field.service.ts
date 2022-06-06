import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Field, FieldDocument } from './field.dto';
import { Model } from 'mongoose';
import { DbParserService } from '@sigrh/db-parser';

@Injectable()
export class FieldService {
  constructor(
    @InjectModel(Field.name)
    private readonly model: Model<FieldDocument>,
    private dbParser: DbParserService,
  ) {}

  async all() {
    const _result = await this.model.find({});
    return _result.map((item: Field) => this.dbParser.parseData(item));
  }

  async findByExam(exam: string) {
    const _result = await this.model.find({ exam });
    return _result.map((item: Field) => this.dbParser.parseData(item));
  }

  async one(id: string) {
    const _result = await this.model.findById(id);
    return this.dbParser.parseData(_result);
  }

  async create(field: Field): Promise<Field> {
    try {
      const _result = await this.model.create(field);
      return this.dbParser.parseData(_result);
    } catch (error) {
      throw new HttpException(
        { statusCode: HttpStatus.BAD_REQUEST, message: error.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update(id: string, field: Partial<Field>): Promise<Field> {
    try {
      const _result = await this.model.updateOne({ id }, field);
      return this.dbParser.parseData(_result);
    } catch (error) {
      throw new HttpException(
        { statusCode: HttpStatus.BAD_REQUEST, message: error.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async remove(id: string): Promise<void> {
    await this.model.updateOne({ _id: id }, { enabled: false });
  }

  async removeExamFields(id: string) {
    return await this.model.remove({ exam: id });
  }
}
