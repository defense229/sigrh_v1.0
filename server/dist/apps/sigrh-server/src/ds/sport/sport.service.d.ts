import { CandidatService } from '../../candidat/candidat.service';
import { DF_CANDIDAT_CATEGORIE } from '../../lib';
export declare class SportService {
    private readonly candidatService;
    constructor(candidatService: CandidatService);
    exec_(query_: any, category?: DF_CANDIDAT_CATEGORIE | undefined): Promise<any[]>;
    getListAll(category?: DF_CANDIDAT_CATEGORIE | undefined): Promise<any[]>;
    getListPresents(category?: DF_CANDIDAT_CATEGORIE | undefined): Promise<any[]>;
    getListNoPresents(category?: DF_CANDIDAT_CATEGORIE | undefined): Promise<any[]>;
    getListAccepted(category?: DF_CANDIDAT_CATEGORIE | undefined): Promise<any[]>;
    getListNonAccepted(category?: DF_CANDIDAT_CATEGORIE | undefined): Promise<any[]>;
}
