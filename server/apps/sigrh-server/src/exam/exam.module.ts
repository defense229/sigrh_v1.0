import { Module } from '@nestjs/common';
import { ExamService } from './exam.service';
import { ExamController } from './exam.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Exam, ExamSchema } from './exam.dto';
import { DbParserModule } from '@sigrh/db-parser';
import { CenterModule } from './center/center.module';
import { RepositoryModule } from '../repository/repository.module';
import { ScoreService } from '../consumers/score/score.service';
import { HttpModule } from '@nestjs/axios';
import { FieldController } from './field.controller';
import { CandidatModule } from '../candidat/candidat.module';
import { ReportService } from '../consumers/report/report.service';
import { RepartitionModule } from './repartition/repartition.module';
import { QrcodeService } from '../consumers/qrcode/qrcode.service';
import { WsGateway } from '@sigrh/websocket';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Exam.name, schema: ExamSchema }]),
    DbParserModule,
    CenterModule,
    RepositoryModule,
    HttpModule,
    CandidatModule,
    RepartitionModule,
  ],
  controllers: [ExamController, FieldController],
  providers: [
    ExamService,
    ScoreService,
    ReportService,
    QrcodeService,
    WsGateway,
  ],
})
export class ExamModule {}
