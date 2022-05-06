import { HttpService } from '@nestjs/axios';
import { HttpStatus } from '@nestjs/common';
import { IFieldPayload, IScorePayload } from './score.types';
export declare class ScoreService {
    private http;
    baseUrl: string;
    constructor(http: HttpService);
    getFields(exam: string): Promise<any>;
    getField(id: string): Promise<any>;
    addField(field: IFieldPayload): Promise<any>;
    updateField(id: string, field: IFieldPayload): Promise<any>;
    removeField(id: string): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
    insertScore(score: IScorePayload): Promise<any>;
    getResults(exam: string, sort: 'ASC' | 'DESC'): Promise<any>;
    countInsertedScores(exam: string, field?: string): Promise<any>;
}
