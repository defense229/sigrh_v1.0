/// <reference types="mongoose/types/pipelinestage" />
import { Document } from 'mongoose';
export declare class Departement {
    label: string;
    exam: string;
}
export declare type DepartementDocument = Departement & Document;
export declare const DepartementSchema: import("mongoose").Schema<Document<Departement, any, any>, import("mongoose").Model<Document<Departement, any, any>, any, any, any>, any, any>;
