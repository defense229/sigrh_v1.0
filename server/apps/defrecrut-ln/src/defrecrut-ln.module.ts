import { Module } from '@nestjs/common';
import { DefrecrutLnController } from './defrecrut-ln.controller';
import { DefrecrutLnService } from './defrecrut-ln.service';
import { DepartementModule } from './departement/departement.module';
import { JuryModule } from './jury/jury.module';
import { QuestionModule } from './question/question.module';
import { CandidatModule } from './candidat/candidat.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ExamModule } from './exam/exam.module';
import { DefConfigModule } from './def-config/def-config.module';
import { LanguagesModule } from './languages/languages.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://cluster0.pigxs.mongodb.net', {
      user: 'denfense',
      pass: 'H^x7MT5cFVxYe@6',
      dbName: 'defrecrut-ln-test',
      w: 'majority',
      retryWrites: true,
    }),
    DepartementModule,
    JuryModule,
    QuestionModule,
    CandidatModule,
    ExamModule,
    DefConfigModule,
    LanguagesModule,
  ],
  controllers: [DefrecrutLnController],
  providers: [DefrecrutLnService],
})
export class DefrecrutLnModule {}
