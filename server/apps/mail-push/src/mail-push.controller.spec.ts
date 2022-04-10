import { Test, TestingModule } from '@nestjs/testing';
import { MailPushController } from './mail-push.controller';
import { MailPushService } from './mail-push.service';

describe('MailPushController', () => {
  let mailPushController: MailPushController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [MailPushController],
      providers: [MailPushService],
    }).compile();

    mailPushController = app.get<MailPushController>(MailPushController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(mailPushController.getHello()).toBe('Hello World!');
    });
  });
});
