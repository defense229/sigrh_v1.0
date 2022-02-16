import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Candidat, CandidatDocument } from './candidat.schema';
import { getEnv, DF_DATA_PAGINATION } from '../lib';
import { seed, DF_CANDIDAT_CATEGORIE, DF_TYPE_CANDIDAT } from '@sigrh/libs';
import { Model } from 'mongoose';
export interface DF_FILTER {
  categorie?: DF_CANDIDAT_CATEGORIE;
  genre?: 'M' | 'F' | 'H';
  accepted?: boolean;
  rejected?: boolean;
  sportPresent?: boolean;
  sportAccept?: boolean;
  departement?: string;
}

@Injectable()
export class CandidatService {
  constructor(
    @InjectModel(Candidat.name) private readonly candidatModel: Model<CandidatDocument>
  ) { }

  async getModel() {
    return this.candidatModel;
  }

  async get(id: string) {
    const candidate = await this.candidatModel.findById(id);
    return candidate;
  }

  async all() {
    const availableCandidates = await this.candidatModel.count({});
    if (availableCandidates === 0) {
      const mode = getEnv('MODE');
      if (mode === 'DEV') {
        const candidates = seed.generateCandidates(1000);
        await this.candidatModel.insertMany(candidates);
      }
    }
    const candidates = await this.candidatModel.find({});
    return candidates;
  }

  async find(query: DF_FILTER, pagination: DF_DATA_PAGINATION = { page: 1, limit: 10 }) {
    const values = await this.candidatModel.find({ ...query }, null, {
      skip: (pagination.page - 1) * pagination.limit,
      limit: pagination.limit
    });
    const total = await this.candidatModel.countDocuments({ ...query });
    const mens = await this.candidatModel.countDocuments({ sexe: 'H', ...query });
    const womens = await this.candidatModel.countDocuments({ sexe: 'F', ...query });
    const aideSoignants = await this.candidatModel.countDocuments({ demobilise: DF_TYPE_CANDIDAT.aideSoignant, ...query });
    const enseignants = await this.candidatModel.countDocuments({ demobilise: DF_TYPE_CANDIDAT.enseignant, ...query });
    const normals = total - aideSoignants - enseignants;
    return {
      total,
      values,
      gender: { male: mens, female: womens },
      category: { normal: normals, aideSoignant: aideSoignants, enseignant: enseignants }
    }
  }

  async verify(id: string, status: string) {
    const firstCondition = await this.candidatModel.findOne({
      accepted: true,
      numero: id
    });

    const secondCondition = await this.candidatModel.findOne({
      accepted: true,
      numeroPiece: id
    });

    if (!firstCondition && !secondCondition) {
      const foundedCandidate = await this.candidatModel.findById(id);
      throw new HttpException(
        foundedCandidate ? foundedCandidate.motif :
          'Dossier non accepté',
        HttpStatus.NOT_ACCEPTABLE);
    }

    if (!Object.values(seed.DF_TYPE_CANDIDAT).includes(status.toUpperCase())) {
      throw new HttpException(
        'Invalid status: one of <NORMAL>, <ENSEIGNANT>, <AIDE_SOIGNANT> has been expected',
        HttpStatus.NOT_ACCEPTABLE);
    }

    const updatedValue = {
      ...JSON.parse(JSON.stringify(firstCondition ? firstCondition : secondCondition)),
      sportPresent: true,
      demobilise: status.toUpperCase()
    };

    console.log(updatedValue);

    await this.candidatModel.updateOne({ _id: updatedValue._id }, updatedValue);
    return { statusCode: 200, message: 'Candidat marqué présent avec succès', id: updatedValue._id };
  }

  async accept(id: string) {
    const firstCondition = await this.candidatModel.findOne({
      sportPresent: true,
      numero: id
    });

    const secondCondition = await this.candidatModel.findOne({
      sportPresent: true,
      numeroPiece: id
    });

    if (!firstCondition && !secondCondition) {
      throw new HttpException(
        'Ce candidat ne peut être accepté : présence non validée',
        HttpStatus.NOT_ACCEPTABLE);
    }

    const updatedValue = {
      ...JSON.parse(JSON.stringify(firstCondition ? firstCondition : secondCondition)),
      sportAccept: true
    };

    await this.candidatModel.updateOne({ _id: updatedValue._id }, updatedValue);
    return { statusCode: 200, message: 'Candidat marqué accepté avec succès', id: updatedValue._id };
  }

}