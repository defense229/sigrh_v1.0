import { Module } from '@nestjs/common';
import { ExamService } from './exam.service';
import { ExamController } from './exam.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RepositoryModule } from '@sigrh/repository';
import { DbParserModule } from '@sigrh/db-parser';
import { Exam, ExamSchema } from './exam.dto';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Exam.name, schema: ExamSchema }]),
    RepositoryModule,
    DbParserModule,
  ],
  controllers: [ExamController],
  providers: [ExamService],
})
export class ExamModule {}
