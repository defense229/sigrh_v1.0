import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Workbook } from 'exceljs';
import { generatePdf } from 'html-pdf-node-ts/lib';
import { escape, stringify } from 'querystring';
import { ReportService } from './report.service';
import { IPdfDownloadPayload, IXlsxDownloadPayload } from './reports.types';

@ApiTags('Reports')
@Controller()
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Post('download-pdf')
  async downloadPdf(@Body() payload: IPdfDownloadPayload) {
    console.log(payload);
    return await generatePdf(
      { content: payload.html },
      {
        format: payload.format ? payload.format : 'A4',
        landscape: payload.landscape ? payload.landscape : false,
        margin: {
          top: 20,
          bottom: 20,
          left: 30,
          right: 30,
        },
        printBackground: true,
      },
    );
  }

  @Post('download-xlsx')
  async downloadXlsx(@Body() payload: IXlsxDownloadPayload) {
    const workbook = new Workbook();
    const sheet = workbook.addWorksheet('New sheet');
    const cols = payload.data[0];
    console.log(
      Object.keys(cols).map((it: any) => ({
        header: cols[it],
        key: it,
        width: 20,
      })) as any[],
    );
    sheet.columns = Object.keys(cols).map((it: any) => ({
      header: it,
      key: it,
      width: 20,
    })) as any[];
    sheet.addRows(payload.data);

    return await workbook.xlsx.writeBuffer();
  }
}
