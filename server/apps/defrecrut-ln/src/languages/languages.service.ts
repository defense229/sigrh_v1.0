import { RepositoryService } from '@sigrh/repository';
import { Language, LanguageDocument } from './entities/language.entity';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DbParserService } from '@sigrh/db-parser';

@Injectable()
export class LanguagesService extends RepositoryService<Language> {
  constructor(
    @InjectModel(Language.name)
    protected readonly model: Model<LanguageDocument>,
    protected readonly dbParser: DbParserService,
  ) {
    super(model, dbParser);
    this.searchFields = ['label'];
  }
}
