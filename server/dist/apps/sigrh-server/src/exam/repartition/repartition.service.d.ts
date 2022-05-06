import { DbParserService } from '@sigrh/db-parser';
import { RepositoryService } from '../../repository/repository.service';
import { Repartition, RepartitionDocument } from './repartition.dto';
import { Model } from 'mongoose';
import { CenterService } from '../center/center.service';
import { CandidatService } from '../../candidat/candidat.service';
export declare class RepartitionService extends RepositoryService<Repartition> {
    protected readonly model: Model<RepartitionDocument>;
    protected dbParser: DbParserService;
    private centerServices;
    private candidateService;
    constructor(model: Model<RepartitionDocument>, dbParser: DbParserService, centerServices: CenterService, candidateService: CandidatService);
    getStats(exam: string): Promise<{}>;
}
