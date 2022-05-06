import { Center, CenterDocument } from './center.dto';
import { Model } from 'mongoose';
import { DbParserService } from '@sigrh/db-parser';
import { RepositoryService } from '../../repository/repository.service';
import { WsGateway } from '@sigrh/websocket';
export declare class CenterService extends RepositoryService<Center> {
    protected readonly model: Model<CenterDocument>;
    protected readonly dbParser: DbParserService;
    private readonly ws;
    _isTaskRunning: any;
    constructor(model: Model<CenterDocument>, dbParser: DbParserService, ws: WsGateway);
    setRepartition(data: Center, makeRepartition: any): Promise<Center>;
}
