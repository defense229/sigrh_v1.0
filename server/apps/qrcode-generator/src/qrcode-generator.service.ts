import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Qrcode, QrcodeDocument } from './qrcode-generator.dto';
import { IQrcodePayload } from './qrcode-generator.types';
import { Model } from 'mongoose';
import * as QRCode from 'qrcode';
import { hash } from 'bcrypt';

@Injectable()
export class QrcodeGeneratorService {
  constructor(
    @InjectModel(Qrcode.name)
    private readonly model: Model<QrcodeDocument>,
  ) {}

  generateQrcode(data: string) {
    return new Promise((resolve, reject) => {
      QRCode.toDataURL(data, (err: any, url: string) => {
        if (err) reject(err);
        resolve(url);
      });
    });
  }

  async createQrcode(payload: IQrcodePayload) {
    try {
      const dataUrl = await this.generateQrcode(payload.data);
      const data = await hash(payload.data, 10);
      return await this.model.create({ ...payload, dataUrl, data });
    } catch (e: any) {
      throw new HttpException(
        { statusCode: HttpStatus.BAD_REQUEST, message: e.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getOne(dataOrTag: string) {
    let _data = await this.model.findOne({ data: dataOrTag });
    if (_data) return _data;

    _data = await this.model.findOne({ tag: dataOrTag });
    if (_data) return _data;

    throw new HttpException(
      { statusCode: HttpStatus.NOT_FOUND, message: 'Qrcode not found!' },
      HttpStatus.NOT_FOUND,
    );
  }
}
