import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RepositoryService } from '@sigrh/repository';
import { CandidatDocument } from 'apps/sigrh-server/src/candidat/candidat.schema';
import { Candidat } from './candidat.dto';
import { Model } from 'mongoose';
import { DbParserService } from '@sigrh/db-parser';
import { DepartementService } from '../departement/departement.service';

@Injectable()
export class CandidatService extends RepositoryService<Candidat> {
  constructor(
    @InjectModel(Candidat.name)
    protected readonly model: Model<CandidatDocument>,
    protected readonly dbParser: DbParserService,
    private readonly departement: DepartementService,
  ) {
    super(model, dbParser);
    this.searchFields = ['nom', 'prenom', 'telephone', 'numero'];
  }

  async getDepartement(exam: string, label: string) {
    return await this.departement.findOne({ exam, label });
  }
}
