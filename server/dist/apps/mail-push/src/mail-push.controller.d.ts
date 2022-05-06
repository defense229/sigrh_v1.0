import { MailPushService } from './mail-push.service';
export declare class MailPushController {
    private readonly mailPushService;
    constructor(mailPushService: MailPushService);
    getHello(): string;
}
