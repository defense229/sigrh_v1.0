import { HttpStatus } from '@nestjs/common';
import { ScorePayload } from '../consumers/score/score.types';
import { Question } from './question.dto';
import { QuestionService } from './question.service';
export declare class QuestionController {
    private readonly questionService;
    constructor(questionService: QuestionService);
    create(question: Question): Promise<any>;
    getResults(exam: string): Promise<any[]>;
    one(id: string): Promise<any>;
    addScore(score: ScorePayload): Promise<any>;
    all(exam: string): Promise<any>;
    archiveMany(ids: string[]): Promise<{
        statusCode: HttpStatus;
    }>;
}
