/// <reference types="mongoose/types/pipelinestage" />
import { IDepartement } from './departement.types';
import { Document } from 'mongoose';
export declare class Departement implements IDepartement {
    label?: string;
    exam?: string;
    enabled: boolean;
}
export declare type DepartementDocument = Departement & Document;
export declare const DepartementSchema: import("mongoose").Schema<Document<Departement, any, any>, import("mongoose").Model<Document<Departement, any, any>, any, any, any>, any, any>;
