import { SportService } from './sport.service';
import { DF_CANDIDAT_CATEGORIE } from '../../lib';
export declare class SportController {
    private readonly service;
    constructor(service: SportService);
    getter_(cb: any, category?: DF_CANDIDAT_CATEGORIE | undefined): Promise<any>;
    getListAll(category?: DF_CANDIDAT_CATEGORIE | undefined): Promise<any>;
    getListPresents(category?: DF_CANDIDAT_CATEGORIE | undefined): Promise<any>;
    getListNoPresents(category?: DF_CANDIDAT_CATEGORIE | undefined): Promise<any>;
    getListAccepted(category?: DF_CANDIDAT_CATEGORIE | undefined): Promise<any>;
    getListNonAccepted(category?: DF_CANDIDAT_CATEGORIE | undefined): Promise<any>;
}
