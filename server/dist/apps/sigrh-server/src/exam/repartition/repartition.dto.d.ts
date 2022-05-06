/// <reference types="mongoose/types/pipelinestage" />
import { IRepartition } from './repartition.types';
import { Document } from 'mongoose';
export declare class Repartition implements IRepartition {
    id?: string;
    exam: string;
    departement: string;
    repartition: any;
}
export declare type RepartitionDocument = Repartition & Document;
export declare const RepartitionSchema: import("mongoose").Schema<Document<Repartition, any, any>, import("mongoose").Model<Document<Repartition, any, any>, any, any, any>, any, any>;
