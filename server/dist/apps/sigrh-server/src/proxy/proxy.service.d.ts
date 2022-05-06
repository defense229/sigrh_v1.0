import { CandidatDocument } from '../candidat/candidat.schema';
import { Model } from 'mongoose';
import { UserDocument } from '../auth/user.schema';
export declare class ProxyService {
    private readonly candidatModel;
    private readonly userModel;
    constructor(candidatModel: Model<CandidatDocument>, userModel: Model<UserDocument>);
    get_(name: string, model: any): Promise<void>;
    getUsers(): Promise<{
        statusCode: number;
        message: string;
    }>;
    getCandidates(): Promise<{
        statusCode: number;
        message: string;
    }>;
    associate(normal: string, teachers: string, helpers: string): Promise<{
        statusCode: number;
        message: string;
    }>;
}
