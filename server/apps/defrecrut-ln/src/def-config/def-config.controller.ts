import { Controller, Post, Body, Get } from '@nestjs/common';
import { DefConfigService } from './def-config.service';
import { DefConfig } from './def-config.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('def-config')
@ApiTags('Configs')
export class DefConfigController {
  constructor(private readonly defConfigService: DefConfigService) {}

  @Get()
  async getConfig() {
    return this.defConfigService.getConfig();
  }

  @Post()
  async setConfig(@Body() body: DefConfig) {
    return this.defConfigService.updateQuestionConfig(body);
  }
}
