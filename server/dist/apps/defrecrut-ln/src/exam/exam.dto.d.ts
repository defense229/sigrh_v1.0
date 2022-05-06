/// <reference types="mongoose/types/pipelinestage" />
import { Document } from 'mongoose';
import { IExam } from './exam.types';
export declare class Exam implements IExam {
    label?: string;
    enabled: boolean;
}
export declare type ExamDocument = Exam & Document;
export declare const ExamSchema: import("mongoose").Schema<Document<Exam, any, any>, import("mongoose").Model<Document<Exam, any, any>, any, any, any>, any, any>;
