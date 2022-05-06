/// <reference types="mongoose/types/pipelinestage" />
import { Document } from 'mongoose';
export declare class Repository {
}
export declare type RepositoryDocument = Document & Repository;
export declare const RepositorySchema: import("mongoose").Schema<Document<Repository, any, any>, import("mongoose").Model<Document<Repository, any, any>, any, any, any>, any, any>;
