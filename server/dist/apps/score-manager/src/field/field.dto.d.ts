/// <reference types="mongoose/types/pipelinestage" />
import { IField } from './field.type';
import { Document } from 'mongoose';
export declare class Field implements IField {
    label: string;
    coefficient: number;
    exam: string;
    extras?: Record<string, any>;
    enabled?: boolean;
}
export declare type FieldDocument = Field & Document;
export declare const FieldSchema: import("mongoose").Schema<Document<Field, any, any>, import("mongoose").Model<Document<Field, any, any>, any, any, any>, any, any>;
