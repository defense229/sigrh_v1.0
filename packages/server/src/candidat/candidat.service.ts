import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Candidat, CandidatDocument } from './candidat.schema';
import { getEnv } from '../lib';
import { seed } from '@sigrh/libs';

@Injectable()
export class CandidatService {
  constructor(
    @InjectModel(Candidat.name) private readonly candidatModel: Model<CandidatDocument>
  ) { }

  async loadFormProd() {

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

    await this.candidatModel.updateOne({ _id: updatedValue._id }, updatedValue);
    return { statusCode: 200, message: 'Candidat marqué présent avec succès' };
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
    return { statusCode: 200, message: 'Candidat marqué accepté avec succès' };
  }

}