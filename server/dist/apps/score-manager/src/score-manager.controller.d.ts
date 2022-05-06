import { Score } from './score-manager.dto';
import { ScoreManagerService } from './score-manager.service';
export declare class ScoreManagerController {
    private readonly scoreManagerService;
    constructor(scoreManagerService: ScoreManagerService);
    examsNotes(id: string): Promise<any[]>;
    results(exam: string, sort?: 'ASC' | 'DESC' | 'NONE'): Promise<{
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
    examsNotesForCandidate(exam: string, candidate: string): Promise<{
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
    create(payload: Score): Promise<any>;
    countScore(exam: string, field?: string): Promise<number>;
}
