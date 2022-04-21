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

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Question.name, schema: QuestionSchema },
    ]),
    RepositoryModule,
    DbParserModule,
    HttpModule,
    CandidatModule,
  ],
  controllers: [QuestionController],
  providers: [QuestionService, ScoreService],
  exports: [QuestionService],
})
export class QuestionModule {}
