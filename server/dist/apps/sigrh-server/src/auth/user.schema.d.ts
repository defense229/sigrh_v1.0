/// <reference types="mongoose/types/pipelinestage" />
import { Document } from 'mongoose';
export declare class User {
    username: string;
    password: string;
    role: string;
    departement: string;
}
export declare type UserDocument = User & Document;
export declare const UserSchema: import("mongoose").Schema<Document<User, any, any>, import("mongoose").Model<Document<User, any, any>, any, any, any>, any, any>;
