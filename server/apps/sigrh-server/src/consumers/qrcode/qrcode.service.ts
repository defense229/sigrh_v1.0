import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { config } from '@sigrh/config';
import { HandleHttpException } from '../../decorators';

export interface IQrcode {
  id?: string;
  tag: string;
  data: string;
  dataUrl?: string;
}

@Injectable()
export class QrcodeService {
  baseUrl = config.api_url.qrcode_generator;

  constructor(private http: HttpService) {}

  @HandleHttpException()
  async create(qrcode: IQrcode): Promise<IQrcode> {
    const response = await this.http.axiosRef.post(this.baseUrl, qrcode);
    return response.data;
  }

  // async verify(qrcodeValue: string): Promise<string | null> {
  //   try {
  //     const response = await this.http.axiosRef.get(this.baseUrl + qrcodeValue);
  //     return response.data.id;
  //   } catch (error) {
  //     return null;
  //   }
  // }
}
