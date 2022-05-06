import { ScoreService } from '../consumers/score/score.service';
import { FieldPayload } from '../consumers/score/score.types';
export declare class FieldController {
    private service;
    constructor(service: ScoreService);
    all(exam: string): Promise<any>;
    create(field: FieldPayload): Promise<any>;
}
