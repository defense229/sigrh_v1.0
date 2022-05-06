import { DbParserService } from '@sigrh/db-parser';
import { Model } from 'mongoose';
import { DefConfigDocument, DefConfig } from './def-config.dto';
export declare class DefConfigService {
    private readonly model;
    private dbParser;
    constructor(model: Model<DefConfigDocument>, dbParser: DbParserService);
    getConfig(): Promise<any>;
    updateQuestionConfig(config: DefConfig): Promise<any>;
}
