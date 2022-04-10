import { Controller, Get } from '@nestjs/common';
import { MailPushService } from './mail-push.service';

@Controller()
export class MailPushController {
  constructor(private readonly mailPushService: MailPushService) {}

  @Get()
  getHello(): string {
    return this.mailPushService.getHello();
  }
}
