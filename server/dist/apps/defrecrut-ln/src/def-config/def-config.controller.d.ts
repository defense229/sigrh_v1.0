import { DefConfigService } from './def-config.service';
import { DefConfig } from './def-config.dto';
export declare class DefConfigController {
    private readonly defConfigService;
    constructor(defConfigService: DefConfigService);
    getConfig(): Promise<any>;
    setConfig(body: DefConfig): Promise<any>;
}
