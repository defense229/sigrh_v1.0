import { HttpStatus } from '@nestjs/common';
import { DbParserService } from '@sigrh/db-parser';
import { Model } from 'mongoose';
export declare class RepositoryService<T> {
    protected readonly model: Model<any>;
    protected dbParser: DbParserService;
    private searcher;
    constructor(model: Model<any>, dbParser: DbParserService);
    set searchFields(fields: string[]);
    parsedSearchFields(search: string): {
        $or: any[];
    };
    all(limit?: number, skip?: number, search?: string, query?: any): Promise<{
        values: any[];
        total: number;
    }>;
    create(data: T): Promise<any>;
    one(id: string): Promise<any>;
    update(id: string, data: Partial<T>): Promise<any>;
    archive(id: string): Promise<{
        statusCode: HttpStatus;
    }>;
    find(query: Record<string, any>): Promise<any[]>;
    findOne(query: Record<string, any>): Promise<any>;
    count(query: Record<string, any>): Promise<number>;
}
