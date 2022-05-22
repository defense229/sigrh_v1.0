import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ExamSetting, ExamSettingDocument } from './setting.dto';
import { Model } from 'mongoose';
import { DbParserService } from '@sigrh/db-parser';
import { compare, hash } from 'bcrypt';

@Injectable()
export class SettingService {
  constructor(
    @InjectModel(ExamSetting.name)
    private readonly model: Model<ExamSettingDocument>,
    private readonly dbParser: DbParserService,
  ) {}

  async updateSetting(id: string, data: Partial<ExamSetting>) {
    const oldSettingCount = await this.model.countDocuments({ exam: id });
    if (oldSettingCount === 0) {
      await this.model.create({ ...data, exam: id });
    }
    await this.model.updateMany({ exam: id }, { ...data, exam: id });
    const _result: any[] = await this.model.find({ exam: id });
    return { statusCode: 200 };
  }

  async getSetting(id: string) {
    const result: any = await this.model.find({ exam: id });
    return this.dbParser.parseData(result);
  }

  async defineCodes(exam: string, codes: Partial<ExamSetting>) {
    const { codeMinistre, codeDopa } = codes;
    await this.updateSetting(exam, { codeDopa, codeMinistre });
    return { statusCode: 200 };
  }

  async verifyCodes(code: string, id: string) {
    const setting = await this.getSetting(id);
    if (await compare(code, setting.codeMinistre)) {
      return { statusCode: HttpStatus.OK };
    }
    return { statusCode: HttpStatus.UNAUTHORIZED };
  }

  async confirmCodes(exam: string, codes: Partial<ExamSetting>) {
    const { codeMinistre, codeDopa } = codes;
    const setting = (await this.getSetting(exam))[0];
    console.log(
      setting,
      setting.codeDopa !== codeDopa,
      setting.codeMinistre !== codeMinistre,
    );
    if (
      !setting ||
      setting.codeDopa !== codeDopa ||
      setting.codeMinistre !== codeMinistre
    ) {
      throw new HttpException(
        {
          statusCode: HttpStatus.UNAUTHORIZED,
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    const r = await this.updateSetting(exam, { isDefinitive: true });
    console.log(r);

    return { statusCode: 200 };
  }
}
