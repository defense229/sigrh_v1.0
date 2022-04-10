import { Injectable } from '@nestjs/common';

@Injectable()
export class MailPushService {
  getHello(): string {
    return 'Hello World!';
  }
}
