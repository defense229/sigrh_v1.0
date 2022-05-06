import { CandidatService } from './candidat.service';
declare class CandidateQuery {
    limit?: number;
    skip?: number;
    search?: string;
}
export declare class CandidatController {
    private readonly candidatService;
    constructor(candidatService: CandidatService);
    all(query: CandidateQuery): Promise<{
        values: any[];
        total: number;
    }>;
    getOne(id: string): Promise<any>;
    findExams(query: CandidateQuery, id: string): Promise<{
        values: any[];
        total: number;
    }>;
    findExamsByType(query: CandidateQuery, id: string, type: string): Promise<{
        values: any[];
        total: number;
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
    getAllStats(id: string): Promise<{
        candidateFileCollectStep: {
            received: number;
            accepted: number;
            rejected: number;
        };
        sportStep: {
            presents: number;
            notPresents: number;
            accepted: number;
            notAccepted: number;
        };
        fileAuthenticationStep: {
            all: number;
            accepted: number;
            rejected: number;
        };
    }>;
}
export {};
