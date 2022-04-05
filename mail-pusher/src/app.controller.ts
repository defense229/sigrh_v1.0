import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { EmailPayload } from './types';

@ApiTags('send-email')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async sendEmail(@Body() payload: EmailPayload) {
    return await this.appService.sendEmail(payload);
  }
}
