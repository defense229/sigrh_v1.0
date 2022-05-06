import { DbParserService } from '@sigrh/db-parser';
import { RepositoryService } from '@sigrh/repository';
import { Departement, DepartementDocument } from './departement.dto';
import { Model } from 'mongoose';
export declare class DepartementService extends RepositoryService<Departement> {
    protected readonly model: Model<DepartementDocument>;
    protected readonly dbParser: DbParserService;
    constructor(model: Model<DepartementDocument>, dbParser: DbParserService);
}
