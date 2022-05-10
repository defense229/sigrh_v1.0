import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Candidat, CandidatDocument } from './candidat.schema';
import {
  DF_DATA_PAGINATION,
  DF_CANDIDAT_CATEGORIE,
  DF_TYPE_CANDIDAT,
  DF_DEPARTEMENTS,
} from '../lib';
import { Model } from 'mongoose';
import { DbParserService } from '@sigrh/db-parser';
import { RepositoryService } from '../repository/repository.service';
import { HandleHttpException } from '@sigrh/decorators';

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

  @HandleHttpException()
  async reloadCandidate() {
    const result = await this.model.updateMany(
      {
        $and: [
          { exam: { $ne: '624d806e82b473d0c636932d' } },
          { exam: { $ne: '624d808282b473d0c6369331' } },
          { exam: { $ne: '624d808e82b473d0c6369335' } },
        ],
      },
      { exam: '624d806e82b473d0c636932d' },
    );
    console.log(result);
    return 'ok';
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

  async acceptCandidature(id: string) {
    await this.model.updateOne(
      { _id: id },
      { accepted: true, rejected: false },
    );
    return this.dbParser.parseData(await this.model.findById(id));
  }
  async rejectCandidature(id: string) {
    await this.model.updateOne(
      { _id: id },
      { accepted: false, rejected: true },
    );
    return this.dbParser.parseData(await this.model.findById(id));
  }

  async setIsPresent(id: string) {
    await this.model.updateOne(
      { _id: id },
      { accepted: true, rejected: false, sportPresent: true },
    );
    return this.dbParser.parseData(await this.model.findById(id));
  }

  async acceptAnyWay(id: string) {
    await this.model.updateOne(
      { _id: id },
      {
        accepted: true,
        rejected: false,
        sportPresent: true,
        sportAccept: true,
      },
    );
    return this.dbParser.parseData(await this.model.findById(id));
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

    return {
      received,
      accepted,
      rejected,
    };
  }

  async getCollectStatsAll(id: string) {
    let received = await this.model.countDocuments({
      enabled: true,
      exam: id,
    });
    let receivedMen = await this.model.countDocuments({
      enabled: true,
      sexe: 'H',
      exam: id,
    });
    let receivedWomen = await this.model.countDocuments({
      enabled: true,
      sexe: 'F',
      exam: id,
    });
    let accepted = await this.model.countDocuments({
      enabled: true,
      accepted: true,
      exam: id,
    });
    let acceptedMen = await this.model.countDocuments({
      enabled: true,
      accepted: true,
      sexe: 'H',
      exam: id,
    });
    let acceptedWomen = await this.model.countDocuments({
      enabled: true,
      accepted: true,
      sexe: 'F',
      exam: id,
    });
    let rejected = await this.model.countDocuments({
      enabled: true,
      accepted: false,
      exam: id,
    });
    let rejectedMen = await this.model.countDocuments({
      enabled: true,
      accepted: false,
      sexe: 'H',
      exam: id,
    });
    let rejectedWomen = await this.model.countDocuments({
      enabled: true,
      accepted: false,
      sexe: 'F',
      exam: id,
    });
    let mens = await this.model.countDocuments({ enabled: true, sexe: 'H' });
    let womens = await this.model.countDocuments({
      enabled: true,
      sexe: 'F',
    });

    const result = {
      all: {
        received,
        receivedMen,
        receivedWomen,
        accepted,
        acceptedMen,
        acceptedWomen,
        rejected,
        rejectedMen,
        rejectedWomen,
        mens,
        womens,
      },
    };

    for (const dep of DF_DEPARTEMENTS) {
      received = await this.model.countDocuments({
        enabled: true,
        departement: dep,
        exam: id,
      });
      receivedMen = await this.model.countDocuments({
        enabled: true,
        departement: dep,
        sexe: 'H',
        exam: id,
      });
      receivedWomen = await this.model.countDocuments({
        enabled: true,
        departement: dep,
        sexe: 'F',
        exam: id,
      });
      accepted = await this.model.countDocuments({
        enabled: true,
        departement: dep,
        accepted: true,
        exam: id,
      });
      acceptedMen = await this.model.countDocuments({
        enabled: true,
        departement: dep,
        accepted: true,
        sexe: 'H',
        exam: id,
      });
      acceptedWomen = await this.model.countDocuments({
        enabled: true,
        departement: dep,
        accepted: true,
        sexe: 'F',
        exam: id,
      });
      rejected = await this.model.countDocuments({
        enabled: true,
        departement: dep,
        accepted: false,
        exam: id,
      });
      rejectedMen = await this.model.countDocuments({
        enabled: true,
        departement: dep,
        accepted: false,
        sexe: 'H',
        exam: id,
      });
      rejectedWomen = await this.model.countDocuments({
        enabled: true,
        departement: dep,
        accepted: false,
        sexe: 'F',
        exam: id,
      });
      mens = await this.model.countDocuments({
        enabled: true,
        sexe: 'H',
        departement: dep,
      });
      womens = await this.model.countDocuments({
        enabled: true,
        departement: dep,
        sexe: 'F',
      });

      result[dep] = {
        received,
        receivedMen,
        receivedWomen,
        accepted,
        acceptedMen,
        acceptedWomen,
        rejected,
        rejectedMen,
        rejectedWomen,
        mens,
        womens,
      };
    }

    return result;
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

  async getSportStatsAll(id: string) {
    let presents = await this.model.countDocuments({
      enabled: true,
      accepted: true,
      sportPresent: true,
      exam: id,
    });

    let presentsMen = await this.model.countDocuments({
      enabled: true,
      accepted: true,
      sexe: 'H',
      sportPresent: true,
      exam: id,
    });

    let presentsWomen = await this.model.countDocuments({
      enabled: true,
      accepted: true,
      sexe: 'F',
      sportPresent: true,
      exam: id,
    });

    let notPresents = await this.model.countDocuments({
      enabled: true,
      accepted: true,
      sportPresent: false,
      exam: id,
    });

    let notPresentsMen = await this.model.countDocuments({
      enabled: true,
      accepted: true,
      sexe: 'H',
      sportPresent: false,
      exam: id,
    });

    let notPresentsWomen = await this.model.countDocuments({
      enabled: true,
      accepted: true,
      sportPresent: false,
      sexe: 'F',
      exam: id,
    });

    let accepted = await this.model.countDocuments({
      enabled: true,
      accepted: true,
      sportAccept: true,
      exam: id,
    });

    let acceptedMen = await this.model.countDocuments({
      enabled: true,
      accepted: true,
      sportAccept: true,
      sexe: 'H',
      exam: id,
    });

    let acceptedWomen = await this.model.countDocuments({
      enabled: true,
      accepted: true,
      sexe: 'F',
      sportAccept: true,
      exam: id,
    });

    let notAccepted = await this.model.countDocuments({
      enabled: true,
      accepted: true,
      sportPresent: true,
      sportAccept: false,
      exam: id,
    });

    let notAcceptedMen = await this.model.countDocuments({
      enabled: true,
      accepted: true,
      sportPresent: true,
      sportAccept: false,
      sexe: 'H',
      exam: id,
    });

    let notAcceptedWomen = await this.model.countDocuments({
      enabled: true,
      accepted: true,
      sportPresent: true,
      sexe: 'F',
      sportAccept: false,
      exam: id,
    });

    const result = {
      all: {
        presents,
        notPresents,
        accepted,
        notAccepted,
        acceptedMen,
        acceptedWomen,
        presentsMen,
        presentsWomen,
        notAcceptedMen,
        notAcceptedWomen,
        notPresentsMen,
        notPresentsWomen,
      },
    };

    for (const dep of DF_DEPARTEMENTS) {
      let presents = await this.model.countDocuments({
        enabled: true,
        departement: dep,
        accepted: true,
        sportPresent: true,
        exam: id,
      });

      let presentsMen = await this.model.countDocuments({
        enabled: true,
        departement: dep,
        accepted: true,
        sexe: 'H',
        sportPresent: true,
        exam: id,
      });

      let presentsWomen = await this.model.countDocuments({
        enabled: true,
        departement: dep,
        accepted: true,
        sexe: 'F',
        sportPresent: true,
        exam: id,
      });

      let notPresents = await this.model.countDocuments({
        enabled: true,
        departement: dep,
        accepted: true,
        sportPresent: false,
        exam: id,
      });

      let notPresentsMen = await this.model.countDocuments({
        enabled: true,
        departement: dep,
        accepted: true,
        sexe: 'H',
        sportPresent: false,
        exam: id,
      });

      let notPresentsWomen = await this.model.countDocuments({
        enabled: true,
        departement: dep,
        accepted: true,
        sportPresent: false,
        sexe: 'F',
        exam: id,
      });

      let accepted = await this.model.countDocuments({
        enabled: true,
        departement: dep,
        accepted: true,
        sportAccept: true,
        exam: id,
      });

      let acceptedMen = await this.model.countDocuments({
        enabled: true,
        departement: dep,
        accepted: true,
        sportAccept: true,
        sexe: 'H',
        exam: id,
      });

      let acceptedWomen = await this.model.countDocuments({
        enabled: true,
        departement: dep,
        accepted: true,
        sexe: 'F',
        sportAccept: true,
        exam: id,
      });

      let notAccepted = await this.model.countDocuments({
        enabled: true,
        departement: dep,
        accepted: true,
        sportPresent: true,
        sportAccept: false,
        exam: id,
      });

      let notAcceptedMen = await this.model.countDocuments({
        enabled: true,
        departement: dep,
        accepted: true,
        sportPresent: true,
        sportAccept: false,
        sexe: 'H',
        exam: id,
      });

      let notAcceptedWomen = await this.model.countDocuments({
        enabled: true,
        departement: dep,
        accepted: true,
        sportPresent: true,
        sexe: 'F',
        sportAccept: false,
        exam: id,
      });

      result[dep] = {
        presents,
        notPresents,
        accepted,
        notAccepted,
        acceptedMen,
        acceptedWomen,
        presentsMen,
        presentsWomen,
        notAcceptedMen,
        notAcceptedWomen,
        notPresentsMen,
        notPresentsWomen,
      };
    }

    return result;
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
