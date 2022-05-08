import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Candidat, CandidatSchema } from './candidat.schema';
import { CandidatService } from './candidat.service';
import { CandidatController } from './candidat.controller';
import { RepositoryModule } from '../repository/repository.module';
import { DbParserModule } from '@sigrh/db-parser';
import { ReportService } from '../consumers/report/report.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Candidat.name, schema: CandidatSchema },
    ]),
    RepositoryModule,
    DbParserModule,
    HttpModule,
  ],
  providers: [CandidatService, ReportService],
  controllers: [CandidatController],
  exports: [CandidatService],
})
export class CandidatModule {}
