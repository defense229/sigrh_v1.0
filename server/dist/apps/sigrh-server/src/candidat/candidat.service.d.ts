/// <reference types="mongoose/types/pipelinestage" />
import { Candidat, CandidatDocument } from './candidat.schema';
import { DF_DATA_PAGINATION, DF_CANDIDAT_CATEGORIE } from '../lib';
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
export declare class CandidatService extends RepositoryService<Candidat> {
    protected readonly model: Model<CandidatDocument>;
    protected dbParser: DbParserService;
    constructor(model: Model<CandidatDocument>, dbParser: DbParserService);
    filter(query: DF_FILTER): Promise<(Candidat & import("mongoose").Document<any, any, any> & {
        _id: any;
    })[]>;
    findDeep(query: DF_FILTER, pagination?: DF_DATA_PAGINATION): Promise<{
        total: number;
        values: (Candidat & import("mongoose").Document<any, any, any> & {
            _id: any;
        })[];
        gender: {
            male: number;
            female: number;
        };
        category: {
            normal: number;
            aideSoignant: number;
            enseignant: number;
        };
    }>;
    verify(id: string, status: string): Promise<{
        statusCode: number;
        message: string;
        id: any;
    }>;
    accept(id: string): Promise<{
        statusCode: number;
        message: string;
        id: any;
    }>;
    getCollectStats(id: string): Promise<{
        received: number;
        accepted: number;
        rejected: number;
    }>;
    getCollectStatsAll(id: string): Promise<{
        all: {
            received: number;
            receivedMen: number;
            receivedWomen: number;
            accepted: number;
            acceptedMen: number;
            acceptedWomen: number;
            rejected: number;
            rejectedMen: number;
            rejectedWomen: number;
            mens: number;
            womens: number;
        };
    }>;
    getSportStats(id: string): Promise<{
        presents: number;
        notPresents: number;
        accepted: number;
        notAccepted: number;
    }>;
    getSportStatsAll(id: string): Promise<{
        all: {
            presents: number;
            notPresents: number;
            accepted: number;
            notAccepted: number;
            acceptedMen: number;
            acceptedWomen: number;
            presentsMen: number;
            presentsWomen: number;
            notAcceptedMen: number;
            notAcceptedWomen: number;
            notPresentsMen: number;
            notPresentsWomen: number;
        };
    }>;
    getDecStats(id: string): Promise<{
        all: number;
        accepted: number;
        rejected: number;
    }>;
    getWritingStats(id: string): Promise<void>;
    getHCStats(id: string): Promise<void>;
    getGlobalStats(id: string): Promise<void>;
}
