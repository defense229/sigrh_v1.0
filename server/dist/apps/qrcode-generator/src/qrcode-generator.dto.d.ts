/// <reference types="mongoose/types/pipelinestage" />
import { IQrcodePayload } from './qrcode-generator.types';
import { Document } from 'mongoose';
export declare class Qrcode implements IQrcodePayload {
    id?: string;
    tag: string;
    data: string;
    dataUrl?: string;
}
export declare type QrcodeDocument = Qrcode & Document;
export declare const QrcodeSchema: import("mongoose").Schema<Document<Qrcode, any, any>, import("mongoose").Model<Document<Qrcode, any, any>, any, any, any>, any, any>;
