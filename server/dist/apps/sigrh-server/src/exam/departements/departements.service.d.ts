import { RepositoryService } from '../../repository/repository.service';
import { Departement, DepartementDocument } from './departements.dto';
import { Model } from 'mongoose';
import { DbParserService } from '@sigrh/db-parser';
export declare class DepartementsService extends RepositoryService<Departement> {
    protected readonly model: Model<DepartementDocument>;
    protected dbParser: DbParserService;
    constructor(model: Model<DepartementDocument>, dbParser: DbParserService);
}
