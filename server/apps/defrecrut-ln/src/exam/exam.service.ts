import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RepositoryService } from '@sigrh/repository';
import { Exam, ExamDocument } from './exam.dto';
import { Model } from 'mongoose';
import { DbParserService } from '@sigrh/db-parser';

@Injectable()
export class ExamService extends RepositoryService<Exam> {
  constructor(
    @InjectModel(Exam.name)
    protected readonly model: Model<ExamDocument>,
    protected readonly dbParser: DbParserService,
  ) {
    super(model, dbParser);
    this.searchFields = ['label'];
  }
}
