import { HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { ScorePayload } from '../consumers/score/score.types';
import { Exam } from './exam.dto';
import { ExamService } from './exam.service';
declare class ExamQuery {
    limit?: number;
    skip?: number;
    search?: string;
}
export declare class ExamController {
    private readonly examService;
    constructor(examService: ExamService);
    create(exam: Exam): Promise<any>;
    getRepartition(exam: string, departement: string): Promise<any>;
    createRepartition(id: string): Promise<import("@nestjs/common").HttpException | import("./center/center.dto").Center>;
    one(id: string): Promise<any>;
    activeStep(id: string, step: string): Promise<import("mongodb").UpdateResult>;
    update(id: string, exam: Exam): Promise<any>;
    archive(id: string): Promise<{
        statusCode: HttpStatus;
    }>;
    archiveMany(ids: string[]): Promise<{
        statusCode: HttpStatus;
    }>;
    all(query: ExamQuery): Promise<{
        values: any[];
        total: number;
    }>;
    downloadRepartition(exam: string, departement: string, res: Response): Promise<void>;
    downloadXlsx(exam: string, departement: string, res: Response): Promise<void>;
    downloadList(exam: string, departement: string, field: string, center: string, room: string, res: Response): Promise<void>;
    downloadCodes(exam: string, departement: string, field: string, center: string, room: string, res: Response): Promise<void>;
    addScore(payload: ScorePayload): Promise<{
        status: HttpStatus;
    }>;
    countScores(exam: string, field: string): Promise<any>;
    getResults(exam: string): Promise<any[]>;
}
export {};
