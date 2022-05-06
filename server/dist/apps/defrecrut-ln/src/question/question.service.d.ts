import { RepositoryService } from '@sigrh/repository';
import { Question, QuestionDocument } from './question.dto';
import { Model } from 'mongoose';
import { DbParserService } from '@sigrh/db-parser';
import { ScoreService } from '../consumers/score/score.service';
import { ScorePayload } from '../consumers/score/score.types';
import { CandidatService } from '../candidat/candidat.service';
import { WsGateway } from '@sigrh/websocket';
export declare class QuestionService extends RepositoryService<Question> {
    protected readonly model: Model<QuestionDocument>;
    protected readonly dbParser: DbParserService;
    private readonly score;
    private readonly candidateService;
    private ws;
    constructor(model: Model<QuestionDocument>, dbParser: DbParserService, score: ScoreService, candidateService: CandidatService, ws: WsGateway);
    getAll(exam: string): Promise<any>;
    create(question: Question): Promise<any>;
    one(id: string): Promise<any>;
    findByNums(exam: string, ids: string[]): Promise<any>;
    createScore(score: ScorePayload): Promise<any>;
    remove(id: string): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
    getResults(exam: string): Promise<any[]>;
}
