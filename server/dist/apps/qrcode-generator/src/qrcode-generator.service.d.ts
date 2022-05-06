/// <reference types="mongoose/types/pipelinestage" />
import { Qrcode, QrcodeDocument } from './qrcode-generator.dto';
import { IQrcodePayload } from './qrcode-generator.types';
import { Model } from 'mongoose';
export declare class QrcodeGeneratorService {
    private readonly model;
    constructor(model: Model<QrcodeDocument>);
    generateQrcode(data: string): Promise<unknown>;
    createQrcode(payload: IQrcodePayload): Promise<Qrcode & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    getOne(dataOrTag: string): Promise<Qrcode & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
}
