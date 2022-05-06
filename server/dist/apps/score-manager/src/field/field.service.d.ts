import { Field, FieldDocument } from './field.dto';
import { Model } from 'mongoose';
import { DbParserService } from '@sigrh/db-parser';
export declare class FieldService {
    private readonly model;
    private dbParser;
    constructor(model: Model<FieldDocument>, dbParser: DbParserService);
    all(): Promise<any[]>;
    findByExam(exam: string): Promise<any[]>;
    one(id: string): Promise<any>;
    create(field: Field): Promise<Field>;
    update(id: string, field: Partial<Field>): Promise<Field>;
    remove(id: string): Promise<void>;
}
