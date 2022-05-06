import { HttpStatus } from '@nestjs/common';
import { Candidat } from './candidat.dto';
import { CandidatService } from './candidat.service';
export declare class RepositoryQuery {
    limit?: number;
    skip?: number;
    search?: string;
}
export declare class CandidatController {
    private readonly candidatService;
    constructor(candidatService: CandidatService);
    all(exam: string, query: RepositoryQuery): Promise<{
        values: any;
        total: number;
    }>;
    create(candidat: Candidat): Promise<any>;
    update(id: string, candidat: Candidat): Promise<any>;
    archiveMany(ids: string[]): Promise<{
        statusCode: HttpStatus;
    }>;
    getJuryCandidates(jury: string): Promise<number>;
}
