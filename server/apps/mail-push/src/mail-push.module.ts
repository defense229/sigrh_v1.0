import { Module } from '@nestjs/common';
import { MailPushController } from './mail-push.controller';
import { MailPushService } from './mail-push.service';

@Module({
  imports: [],
  controllers: [MailPushController],
  providers: [MailPushService],
})
export class MailPushModule {}
