import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Candidat, CandidatDocument } from './candidat.schema';
import {
  DF_DATA_PAGINATION,
  DF_CANDIDAT_CATEGORIE,
  DF_TYPE_CANDIDAT,
} from '../lib';
import { Model } from 'mongoose';
import { DbParserService } from '@sigrh/db-parser';
import { RepositoryService } from '../repository/repository.service';

export interface DF_FILTER {
  categorie?: DF_CANDIDAT_CATEGORIE;
  genre?: 'M' | 'F' | 'H';
  accepted?: boolean;
  rejected?: boolean;
  sportPresent?: boolean;
  sportAccept?: boolean;
  departement?: string | RegExp;
  exam?: string;
}

@Injectable()
export class CandidatService extends RepositoryService<Candidat> {
  constructor(
    @InjectModel(Candidat.name)
    protected readonly model: Model<CandidatDocument>,
    protected dbParser: DbParserService,
  ) {
    super(model, dbParser);
    this.searchFields = ['nom', 'prenom', 'numero', 'telephone'];
  }

  async filter(query: DF_FILTER) {
    return await this.model.find(query);
  }

  async findDeep(
    query: DF_FILTER,
    pagination: DF_DATA_PAGINATION = { page: 1, limit: 10 },
  ) {
    const values = await this.model.find({ ...query }, null, {
      skip: (pagination.page - 1) * pagination.limit,
      limit: pagination.limit,
    });
    const total = await this.model.countDocuments({ ...query });
    const mens = await this.model.countDocuments({
      sexe: 'H',
      ...query,
    });
    const womens = await this.model.countDocuments({
      sexe: 'F',
      ...query,
    });
    const aideSoignants = await this.model.countDocuments({
      demobilise: DF_TYPE_CANDIDAT.aideSoignant,
      ...query,
    });
    const enseignants = await this.model.countDocuments({
      demobilise: DF_TYPE_CANDIDAT.enseignant,
      ...query,
    });
    const normals = total - aideSoignants - enseignants;
    return {
      total,
      values,
      gender: { male: mens, female: womens },
      category: {
        normal: normals,
        aideSoignant: aideSoignants,
        enseignant: enseignants,
      },
    };
  }

  async verify(id: string, status: string) {
    const firstCondition = await this.model.findOne({
      accepted: true,
      numero: id,
    });

    const secondCondition = await this.model.findOne({
      accepted: true,
      numeroPiece: id,
    });

    if (!firstCondition && !secondCondition) {
      const foundedCandidate = await this.model.findById(id);
      throw new HttpException(
        foundedCandidate ? foundedCandidate.motif : 'Dossier non accepté',
        HttpStatus.NOT_ACCEPTABLE,
      );
    }

    if (!Object.values(DF_TYPE_CANDIDAT).includes(status.toUpperCase())) {
      throw new HttpException(
        'Invalid status: one of <NORMAL>, <ENSEIGNANT>, <AIDE_SOIGNANT> has been expected',
        HttpStatus.NOT_ACCEPTABLE,
      );
    }

    const updatedValue = {
      ...JSON.parse(
        JSON.stringify(firstCondition ? firstCondition : secondCondition),
      ),
      sportPresent: true,
      demobilise: status.toUpperCase(),
    };

    await this.model.updateOne({ _id: updatedValue._id }, updatedValue);
    return {
      statusCode: 200,
      message: 'Candidat marqué présent avec succès',
      id: updatedValue._id,
    };
  }

  async accept(id: string) {
    const firstCondition = await this.model.findOne({
      sportPresent: true,
      numero: id,
    });

    const secondCondition = await this.model.findOne({
      sportPresent: true,
      numeroPiece: id,
    });

    if (!firstCondition && !secondCondition) {
      throw new HttpException(
        'Ce candidat ne peut être accepté : présence non validée',
        HttpStatus.NOT_ACCEPTABLE,
      );
    }

    const updatedValue = {
      ...JSON.parse(
        JSON.stringify(firstCondition ? firstCondition : secondCondition),
      ),
      sportAccept: true,
    };

    await this.model.updateOne({ _id: updatedValue._id }, updatedValue);
    return {
      statusCode: 200,
      message: 'Candidat marqué accepté avec succès',
      id: updatedValue._id,
    };
  }

  async getCollectStats(id: string) {
    const received = await this.model.countDocuments({
      enabled: true,
      exam: id,
    });
    const accepted = await this.model.countDocuments({
      enabled: true,
      accepted: true,
      exam: id,
    });
    const rejected = await this.model.countDocuments({
      enabled: true,
      accepted: false,
      exam: id,
    });
    const mens = await this.model.countDocuments({ enabled: true, sexe: 'H' });
    const womens = await this.model.countDocuments({
      enabled: true,
      sexe: 'F',
    });

    return {
      received,
      accepted,
      rejected,
      mens,
      womens,
    };
  }

  async getSportStats(id: string) {
    const presents = await this.model.countDocuments({
      enabled: true,
      accepted: true,
      sportPresent: true,
      exam: id,
    });

    const notPresents = await this.model.countDocuments({
      enabled: true,
      accepted: true,
      sportPresent: false,
      exam: id,
    });

    const accepted = await this.model.countDocuments({
      enabled: true,
      accepted: true,
      sportAccept: true,
      exam: id,
    });

    const notAccepted = await this.model.countDocuments({
      enabled: true,
      accepted: true,
      sportPresent: true,
      sportAccept: false,
      exam: id,
    });
    return { presents, notPresents, accepted, notAccepted };
  }

  async getDecStats(id: string) {
    const all = await this.model.countDocuments({
      enabled: true,
      accepted: true,
      sportAccept: true,
      exam: id,
    });

    const accepted = await this.model.countDocuments({
      enabled: true,
      accepted: true,
      sportAccept: true,
      exam: id,
      decAccept: true,
    });

    const rejected = await this.model.countDocuments({
      enabled: true,
      accepted: true,
      sportAccept: true,
      exam: id,
      decRefuse: true,
    });

    return { all, accepted, rejected };
  }

  async getWritingStats(id: string) {}

  async getHCStats(id: string) {}

  async getGlobalStats(id: string) {}
}
