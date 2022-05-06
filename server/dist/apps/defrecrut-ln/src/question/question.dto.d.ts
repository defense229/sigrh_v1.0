/// <reference types="mongoose/types/pipelinestage" />
import { IQuestion } from './question.types';
import { Document } from 'mongoose';
export declare class Question implements IQuestion {
    label?: string;
    exam?: string;
    enabled: boolean;
}
export declare type QuestionDocument = Question & Document;
export declare const QuestionSchema: import("mongoose").Schema<Document<Question, any, any>, import("mongoose").Model<Document<Question, any, any>, any, any, any>, any, any>;
