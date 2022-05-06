import { RepartitionService } from './repartition.service';
export declare class RepartitionController {
    private readonly repartitionService;
    constructor(repartitionService: RepartitionService);
    getStats(exam: string): Promise<{}>;
    getOne(exam: string, departement: string): Promise<any>;
}
