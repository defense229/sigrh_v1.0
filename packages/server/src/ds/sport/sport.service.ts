import { Injectable } from '@nestjs/common';
import { CandidatService } from '../../candidat/candidat.service';
import { DF_CANDIDAT_CATEGORIE, DF_TYPE_CANDIDAT } from '@sigrh/libs';

@Injectable()
export class SportService {

  constructor(private readonly candidatService: CandidatService) { }

  async exec_(query_: any, category: DF_CANDIDAT_CATEGORIE | undefined = undefined) {
    let query: any = { ...query_ };
    if ([DF_TYPE_CANDIDAT.aideSoignant, DF_TYPE_CANDIDAT.enseignant, 'Oui', 'Non'].includes(category)) {
      query = { ...query, demobilise: category };
    }
    return await this.candidatService.find(query);
  }

  async getListAll(category: DF_CANDIDAT_CATEGORIE | undefined = undefined) {
    console.log(this)
    return await this.exec_({ accepted: true }, category);
  }

  async getListPresents(category: DF_CANDIDAT_CATEGORIE | undefined = undefined) {
    return await this.exec_({
      accepted: true,
      sportPresent: true
    }, category);
  }

  async getListNoPresents(category: DF_CANDIDAT_CATEGORIE | undefined = undefined) {
    return await this.exec_({
      accepted: true,
      sportPresent: false
    }, category);
  }

  async getListAccepted(category: DF_CANDIDAT_CATEGORIE | undefined = undefined) {
    return await this.exec_({
      accepted: true,
      sportPresent: true,
      sportAccept: true
    }, category);
  }

  async getListNonAccepted(category: DF_CANDIDAT_CATEGORIE | undefined = undefined) {
    return await this.exec_({
      accepted: true,
      sportPresent: true,
      sportAccept: false
    }, category);
  }

}
