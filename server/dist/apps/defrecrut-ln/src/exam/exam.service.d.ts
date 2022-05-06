import { RepositoryService } from '@sigrh/repository';
import { Exam, ExamDocument } from './exam.dto';
import { Model } from 'mongoose';
import { DbParserService } from '@sigrh/db-parser';
export declare class ExamService extends RepositoryService<Exam> {
    protected readonly model: Model<ExamDocument>;
    protected readonly dbParser: DbParserService;
    constructor(model: Model<ExamDocument>, dbParser: DbParserService);
}
