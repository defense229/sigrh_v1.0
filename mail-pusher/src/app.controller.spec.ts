import { Test, TestingModule } from '@nestjs/testing';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  describe('root', () => {
    // it('should return access token', async () => {
    //   expect(await appService.init()).toBe(true);
    // });

    // it('should parse string properly and return string', async () => {
    //   expect(await appService.parseContent('hello')).toBe('hello');
    // });

    // it('should parse buffer properly and return string', async () => {

    //   const content = readFileSync(resolve('src/sample.twig'));

    //   expect(await appService.parseContent(content, {name: 'John Doe'})).toBe('parsed');
    // });

    it('should send email successfully', async () => {
      expect(await appService.sendEmail({
        content: readFileSync(resolve('src/sample.twig')),
        receivers: ['salemaffa@gmail.com'],
        contentData: {name: 'Salem'},
        subject: 'Test email from sigrh'
      })).toEqual({
        statusCode: 200,
        message: 'Email(s) sent successfully!'
      })
    })

  });
});
