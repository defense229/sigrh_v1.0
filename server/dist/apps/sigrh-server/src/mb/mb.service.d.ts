import { CandidatService } from '../candidat/candidat.service';
export declare class MbService {
    private readonly candidatService;
    constructor(candidatService: CandidatService);
    get(id: string): Promise<any>;
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
}
