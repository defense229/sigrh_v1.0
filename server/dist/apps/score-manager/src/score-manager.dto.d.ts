import mongoose from 'mongoose';
import { Document } from 'mongoose';
import { IScore } from './score-manager.types';
export declare class Score implements IScore {
    id?: string;
    field: string;
    candidate: string;
    exam: string;
    value: number;
    extras?: string;
}
export declare type ScoreDocument = Score & Document;
export declare const ScoreSchema: mongoose.Schema<mongoose.Document<Score, any, any>, mongoose.Model<mongoose.Document<Score, any, any>, any, any, any>, any, any>;
