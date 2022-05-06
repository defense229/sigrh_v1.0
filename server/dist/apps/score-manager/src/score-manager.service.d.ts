import { Score, ScoreDocument } from './score-manager.dto';
import { Model } from 'mongoose';
import { DbParserService } from '@sigrh/db-parser';
export declare class ScoreManagerService {
    private readonly model;
    private dbParser;
    constructor(model: Model<ScoreDocument>, dbParser: DbParserService);
    all(): Promise<any[]>;
    findByExam(exam: string): Promise<any[]>;
    countByExam(exam: string, field?: string): Promise<number>;
    getCandidateScore(exam: string, candidate: string): Promise<{
        mean: string;
        sum: number;
        coefSum: any;
        scores: {
            value: any;
            candidate: any;
            coefficient: any;
            field: any;
            poundValue: number;
            extras: any;
        }[];
    }>;
    getAllCandidates(): Promise<string[]>;
    getExamsScores(exam: string, sorted?: boolean, reverse?: boolean): Promise<{
        sum: string;
        mean: string;
        coefSum: any;
        scores: {
            value: any;
            candidate: any;
            coefficient: any;
            field: any;
            poundValue: number;
            extras: any;
        }[];
    }[]>;
    save(payload: Score): Promise<any>;
}
