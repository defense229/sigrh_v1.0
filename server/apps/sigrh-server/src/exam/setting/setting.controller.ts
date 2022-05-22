import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ExamSetting } from './setting.dto';
import { SettingService } from './setting.service';

@Controller('settings')
@ApiTags("Exam's settings")
export class SettingController {
  constructor(private readonly settingService: SettingService) {}

  @Get(':id')
  async getSetting(@Param('id') id: string) {
    const s_ = await this.settingService.getSetting(id);
    console.log(s_);
    if (s_.length > 0) return s_[0];
    return s_;
  }

  @Post('define-codes/:exam')
  async defineCodes(@Body() codes: ExamSetting, @Param('exam') exam: string) {
    return this.settingService.defineCodes(exam, codes);
  }

  @Post('confirm-codes/:exam')
  async confirmCodes(@Body() codes: ExamSetting, @Param('exam') exam: string) {
    return this.settingService.confirmCodes(exam, codes);
  }

  @Patch(':id')
  async updateExamSettings(@Param('id') id: string, @Body() data: ExamSetting) {
    return await this.settingService.updateSetting(id, data);
  }
}
