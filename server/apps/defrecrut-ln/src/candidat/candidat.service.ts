import { ReportService } from './../consumers/report/report.service';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RepositoryService } from '@sigrh/repository';
import { Candidat, CandidatDocument } from './candidat.dto';
import { Model } from 'mongoose';
import { DbParserService } from '@sigrh/db-parser';
import { DepartementService } from '../departement/departement.service';
import { join } from 'path';
import { tmpdir } from 'os';
import { writeFileSync } from 'fs';

@Injectable()
export class CandidatService extends RepositoryService<Candidat> {
  constructor(
    @InjectModel(Candidat.name)
    protected readonly model: Model<CandidatDocument>,
    protected readonly dbParser: DbParserService,
    private readonly departement: DepartementService,
    private readonly report: ReportService,
  ) {
    super(model, dbParser);
    this.searchFields = ['nom', 'prenom', 'telephone', 'numero'];
  }

  async getDepartement(exam: string, label: string) {
    return await this.departement.findOne({ exam, label });
  }

  async countJuryCandidates(jury: string) {
    return await this.model.countDocuments({ jury });
  }

  async getCandidateList(exam: string, departement: string) {
    const departement_ = await this.departement.findOne({ _id: departement });
    const candidates = await this.model.find({
      exam,
      departement,
      enabled: true,
    });
    let i = 0;
    const payload = candidates.map((candidate: Candidat) => ({
      Numero: ++i + '',
      Nom: candidate.nom.toUpperCase(),
      Prénom: candidate.prenom.toUpperCase(),
      'Numéro de table': candidate.numero,
      Gennre: candidate.sexe,
      'Date de naissance': candidate.dateNaissance,
      Téléphone: candidate.telephone,
      Département: departement_.label,
    }));
    const buffer = await this.downloadXlsx(payload);
    const path = join(
      tmpdir(),
      `liste_des_candidats_${departement_.label}.xlsx`,
    );
    writeFileSync(path, Buffer.from(buffer.data));
    return path;
  }

  async downloadXlsx(data: Record<string, string>[]) {
    return await this.report.downloadXlsx(data);
  }
}
