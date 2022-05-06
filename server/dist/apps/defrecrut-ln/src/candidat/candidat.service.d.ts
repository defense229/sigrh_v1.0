import { RepositoryService } from '@sigrh/repository';
import { Candidat, CandidatDocument } from './candidat.dto';
import { Model } from 'mongoose';
import { DbParserService } from '@sigrh/db-parser';
import { DepartementService } from '../departement/departement.service';
export declare class CandidatService extends RepositoryService<Candidat> {
    protected readonly model: Model<CandidatDocument>;
    protected readonly dbParser: DbParserService;
    private readonly departement;
    constructor(model: Model<CandidatDocument>, dbParser: DbParserService, departement: DepartementService);
    getDepartement(exam: string, label: string): Promise<any>;
    countJuryCandidates(jury: string): Promise<number>;
}
