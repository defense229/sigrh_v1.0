import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RepositoryService } from '../../repository/repository.service';
import { Departement, DepartementDocument } from './departements.dto';
import { Model } from 'mongoose';
import { DbParserService } from '@sigrh/db-parser';

@Injectable()
export class DepartementsService extends RepositoryService<Departement> {
  constructor(
    @InjectModel(Departement.name)
    protected readonly model: Model<DepartementDocument>,
    protected dbParser: DbParserService,
  ) {
    super(model, dbParser);
    this.searchFields = ['label'];
  }
}
