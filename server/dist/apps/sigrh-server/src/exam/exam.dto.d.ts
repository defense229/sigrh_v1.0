/// <reference types="mongoose/types/pipelinestage" />
import { ExamStatus, ExamStepStatus, IExam } from './exam.types';
import { Document } from 'mongoose';
export declare class Exam implements IExam {
    id?: string;
    label: string;
    center: string;
    status: ExamStatus;
    candidateFileCollectStep: ExamStepStatus;
    sportStep: ExamStepStatus;
    fileAuthenticationStep: ExamStepStatus;
    writingStep: ExamStepStatus;
    healthControlStep: ExamStepStatus;
    enabled: boolean;
}
export declare type ExamDocument = Exam & Document;
export declare const ExamSchema: import("mongoose").Schema<Document<Exam, any, any>, import("mongoose").Model<Document<Exam, any, any>, any, any, any>, any, any>;
