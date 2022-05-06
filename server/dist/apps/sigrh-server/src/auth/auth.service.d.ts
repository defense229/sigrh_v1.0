import { Model } from 'mongoose';
import { UserDocument } from './user.schema';
import { DbParserService } from '@sigrh/db-parser';
export declare class AuthService {
    private readonly userModel;
    private readonly dbParser;
    constructor(userModel: Model<UserDocument>, dbParser: DbParserService);
    login(username: any, password: any): Promise<{
        statusCode: number;
        message: string;
        user: any;
    }>;
}
