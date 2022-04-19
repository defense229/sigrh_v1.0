import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DbParserService } from '@sigrh/db-parser';
import { RepositoryService } from '@sigrh/repository';
import { Departement, DepartementDocument } from './departement.dto';
import { Model } from 'mongoose';

@Injectable()
export class DepartementService extends RepositoryService<Departement> {
  constructor(
    @InjectModel(Departement.name)
    protected readonly model: Model<DepartementDocument>,
    protected readonly dbParser: DbParserService,
  ) {
    super(model, dbParser);
  }
}
