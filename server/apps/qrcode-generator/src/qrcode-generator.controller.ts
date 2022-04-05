import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DbParserService } from '@sigrh/db-parser';
import { Qrcode } from './qrcode-generator.dto';
import { QrcodeGeneratorService } from './qrcode-generator.service';

@ApiTags('qrcodes')
@Controller('qrcodes')
export class QrcodeGeneratorController {
  constructor(
    private readonly qrcodeGeneratorService: QrcodeGeneratorService,
    private dbParser: DbParserService,
  ) {}

  @Post()
  async save(@Body() payload: Qrcode) {
    const result = await this.qrcodeGeneratorService.createQrcode(payload);
    return this.dbParser.parseData(result);
  }

  @Get(':value')
  async verify(@Param('value') value: string) {
    return this.dbParser.parseData(
      await this.qrcodeGeneratorService.getOne(value),
    );
  }
}
