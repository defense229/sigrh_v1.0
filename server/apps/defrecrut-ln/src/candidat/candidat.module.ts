import { Module } from '@nestjs/common';
import { CandidatService } from './candidat.service';
import { CandidatController } from './candidat.controller';
import { Candidat, CandidatSchema } from './candidat.dto';
import { MongooseModule } from '@nestjs/mongoose';
import { DbParserModule } from '@sigrh/db-parser';
import { RepositoryModule } from '@sigrh/repository';
import { DepartementModule } from '../departement/departement.module';
import { ReportService } from '../consumers/report/report.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Candidat.name, schema: CandidatSchema },
    ]),
    DbParserModule,
    RepositoryModule,
    DepartementModule,
    HttpModule,
  ],
  controllers: [CandidatController],
  providers: [CandidatService, ReportService],
  exports: [CandidatService],
})
export class CandidatModule {}
