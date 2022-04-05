import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { config } from '@sigrh/config';

@Injectable()
export class ReportService {
  baseUrl = config.api_url.report;
  constructor(private http: HttpService) {}

  async downloadPdf(html: string) {
    const response = await this.http.axiosRef.post(
      this.baseUrl + 'download-pdf',
      { html },
    );
    return response.data;
  }

  async downloadXlsx(data: Record<string, string>[]) {
    const response = await this.http.axiosRef.post(
      this.baseUrl + 'download-xlsx',
      { data },
    );
    return response.data;
  }
}
