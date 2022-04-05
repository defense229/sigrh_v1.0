import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CandidatModule } from './candidat/candidat.module';
import { MbModule } from './mb/mb.module';
import { DsModule } from './ds/ds.module';
import { ProxyModule } from './proxy/proxy.module';
import { QrcodeService } from './consumers/qrcode/qrcode.service';
import { ScoreService } from './consumers/score/score.service';
import { HttpModule } from '@nestjs/axios';
import { ExamModule } from './exam/exam.module';
import { RepositoryModule } from './repository/repository.module';
import { config } from '@sigrh/config';
import { ReportService } from './consumers/report/report.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://cluster0.pigxs.mongodb.net', {
      user: 'denfense',
      pass: 'H^x7MT5cFVxYe@6',
      dbName: config.db_name,
      w: 'majority',
      retryWrites: true,
    }),
    AuthModule,
    CandidatModule,
    MbModule,
    DsModule,
    ProxyModule,
    HttpModule,
    ExamModule,
    RepositoryModule,
  ],
  controllers: [AppController],
  providers: [AppService, QrcodeService, ScoreService, ReportService],
})
export class AppModule {}
