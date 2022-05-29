import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Question, QuestionSchema } from './question.dto';
import { RepositoryModule } from '@sigrh/repository';
import { DbParserModule } from '@sigrh/db-parser';
import { ScoreService } from '../consumers/score/score.service';
import { HttpModule } from '@nestjs/axios';
import { CandidatModule } from '../candidat/candidat.module';
import { WebsocketModule } from '@sigrh/websocket';
import { DepartementModule } from '../departement/departement.module';
import { ReportService } from '../consumers/report/report.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Question.name, schema: QuestionSchema },
    ]),
    RepositoryModule,
    DbParserModule,
    HttpModule,
    CandidatModule,
    WebsocketModule,
    DepartementModule,
  ],
  controllers: [QuestionController],
  providers: [QuestionService, ScoreService, ReportService],
  exports: [QuestionService],
})
export class QuestionModule {}
