import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { writeFileSync } from 'fs';
import { google } from 'googleapis';
import { createTransport } from 'nodemailer';
import { tmpdir } from 'os';
import { join } from 'path';
import { renderFile } from 'twig';
import { config } from './config';
import { IEmailPayload } from './types';

@Injectable()
export class AppService {

  constructor() {}

  async init() {
    const OAuth2 = google.auth.OAuth2;
    const oauthClient = new OAuth2(
      config.clientId,
      config.clientSecret,
      'https://developers.google.com/oauthplayground'
    );
    oauthClient.setCredentials({
      refresh_token: config.refreshToken
    });

    const accessToken = (await oauthClient.getAccessToken()).token;

    const transporter = createTransport({
      service: 'gmail',
      auth: {
        type: 'OAUTH2',
        user: config.email,
        accessToken,
        clientId: config.clientId,
        clientSecret: config.clientSecret,
        refreshToken: config.refreshToken
      }
    });

    return transporter;
  }

  async parseContent(content: string | Buffer, data: any = {}) {
    if (typeof content === 'string') {
      return content;
    }

    const filePath = join(tmpdir(), 'template.twig');
    writeFileSync(filePath, content);

    return new Promise((resolve, reject) => {
      renderFile(filePath, data, (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }

  async sendEmail(payload: IEmailPayload) {

    // Validate receivers emails
    const invalidEmails = payload.receivers.filter(email => {
      return !/.+@.+\..{2,}/.test(email);
    });

    if (invalidEmails.length !== 0) {
      return new HttpException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'The following emails are not valid : ' + invalidEmails.join(', ')
      }, HttpStatus.BAD_REQUEST);
    }

    const options = {
      subject: payload.subject,
      to: payload.receivers,
      html: await this.parseContent(payload.content, payload.contentData || {}),
      from: config.email
    };

    const transporter = await this.init();
    await transporter.sendMail(options);

    return { 
      statusCode: 200,
      message: 'Email(s) sent successfully!'
    }
  }
}
