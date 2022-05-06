/// <reference types="mongoose/types/pipelinestage" />
import { IDefConfig } from './def-config.types';
import { Document } from 'mongoose';
export declare class DefConfig implements IDefConfig {
    questions?: number;
}
export declare type DefConfigDocument = DefConfig & Document;
export declare const DefConfigSchema: import("mongoose").Schema<Document<DefConfig, any, any>, import("mongoose").Model<Document<DefConfig, any, any>, any, any, any>, any, any>;
