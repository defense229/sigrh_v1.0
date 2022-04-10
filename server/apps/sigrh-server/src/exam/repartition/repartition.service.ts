import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DbParserService } from '@sigrh/db-parser';
import { RepositoryService } from '../../repository/repository.service';
import { Repartition, RepartitionDocument } from './repartition.dto';
import { Model } from 'mongoose';

@Injectable()
export class RepartitionService extends RepositoryService<Repartition> {
  constructor(
    @InjectModel(Repartition.name)
    protected readonly model: Model<RepartitionDocument>,
    protected dbParser: DbParserService,
  ) {
    super(model, dbParser);
    this.searchFields = [];
  }
}
