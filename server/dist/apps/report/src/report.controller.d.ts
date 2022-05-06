/// <reference types="node" />
import { ReportService } from './report.service';
import { IPdfDownloadPayload, IXlsxDownloadPayload } from './reports.types';
export declare class ReportController {
    private readonly reportService;
    constructor(reportService: ReportService);
    downloadPdf(payload: IPdfDownloadPayload): Promise<Buffer>;
    downloadXlsx(payload: IXlsxDownloadPayload): Promise<import("exceljs").Buffer>;
}
