/// <reference types="mongoose/types/pipelinestage" />
import { ICenter } from './center.types';
import { Document } from 'mongoose';
import { ExamRepartitionStatus } from '../exam.types';
export declare class Center implements ICenter {
    exam: string;
    departement: string;
    centers: number;
    rooms: number;
    candidates: number;
    enabled: boolean;
    percenteDone?: number;
    repartitionStatus?: ExamRepartitionStatus;
}
export declare class CenterUpdateInput {
    centers: number;
    rooms: number;
}
export declare type CenterDocument = Center & Document;
export declare const CenterSchema: import("mongoose").Schema<Document<Center, any, any>, import("mongoose").Model<Document<Center, any, any>, any, any, any>, any, any>;
