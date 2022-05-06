import { DbParserService } from '@sigrh/db-parser';
import { Qrcode } from './qrcode-generator.dto';
import { QrcodeGeneratorService } from './qrcode-generator.service';
export declare class QrcodeGeneratorController {
    private readonly qrcodeGeneratorService;
    private dbParser;
    constructor(qrcodeGeneratorService: QrcodeGeneratorService, dbParser: DbParserService);
    save(payload: Qrcode): Promise<any>;
    verify(value: string): Promise<any>;
}
