import { Module } from '@nestjs/common';
import { RepositoryService } from './repository.service';
import { DbParserModule } from '@sigrh/db-parser';
import { MongooseModule } from '@nestjs/mongoose';
import { Exam, ExamSchema } from '../exam/exam.dto';

@Module({
  imports: [
    DbParserModule,
    MongooseModule.forFeature([{ name: Exam.name, schema: ExamSchema }]),
  ],
  providers: [RepositoryService],
})
export class RepositoryModule {}
