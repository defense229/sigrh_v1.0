import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DbParserService } from '@sigrh/db-parser';
import { RepositoryService } from '../../repository/repository.service';
import { Repartition, RepartitionDocument } from './repartition.dto';
import { Model } from 'mongoose';
import { CenterService } from '../center/center.service';
import { CandidatService } from '../../candidat/candidat.service';

@Injectable()
export class RepartitionService extends RepositoryService<Repartition> {
  constructor(
    @InjectModel(Repartition.name)
    protected readonly model: Model<RepartitionDocument>,
    protected dbParser: DbParserService,
    private centerServices: CenterService,
    private candidateService: CandidatService,
  ) {
    super(model, dbParser);
    this.searchFields = [];
  }

  async getStats(exam: string) {
    const centers = await this.centerServices.find({ exam });
    const result = {};

    for (const center of centers) {
      result[center.departement] = {
        nbCenters: center.centers,
        nbRoomsPerCenter: center.rooms,
        nbCandidatePerRoom: center.candidates,
        totalCandidates: {
          all: await this.candidateService.count({
            exam,
            $or: center.departement
              .split('-')
              .map((dep) => ({ departement: dep })),
            sportAccept: true,
            accepted: true,
          }),
          mens: await this.candidateService.count({
            exam,
            $or: center.departement
              .split('-')
              .map((dep) => ({ departement: dep })),
            sportAccept: true,
            sexe: 'H',
            accepted: true,
          }),
          women: await this.candidateService.count({
            exam,
            $or: center.departement
              .split('-')
              .map((dep) => ({ departement: dep })),
            sportAccept: true,
            sexe: 'F',
            accepted: true,
          }),
        },
      };
    }

    return result;
  }
}
