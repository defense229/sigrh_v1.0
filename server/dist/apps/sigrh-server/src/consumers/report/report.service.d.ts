import { HttpService } from '@nestjs/axios';
export declare class ReportService {
    private http;
    baseUrl: string;
    constructor(http: HttpService);
    downloadPdf(html: string, other?: any): Promise<any>;
    downloadXlsx(data: Record<string, string>[]): Promise<any>;
}
