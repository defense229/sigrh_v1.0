import { MbService } from './mb.service';
export declare class MbController {
    private readonly mbService;
    constructor(mbService: MbService);
    confirmPresence(id: string, status: string): Promise<{
        statusCode: number;
        message: string;
        id: any;
    }>;
    confirmAccept(id: string): Promise<{
        statusCode: number;
        message: string;
        id: any;
    }>;
    candidatInfo(id: string): Promise<any>;
}
