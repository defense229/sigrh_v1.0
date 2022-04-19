import { Module } from '@nestjs/common';
import { CandidatService } from './candidat.service';
import { CandidatController } from './candidat.controller';
import { Candidat } from 'apps/sigrh-server/src/candidat/candidat.schema';
import { CandidatSchema } from './candidat.dto';
import { MongooseModule } from '@nestjs/mongoose';
import { DbParserModule } from '@sigrh/db-parser';
import { RepositoryModule } from '@sigrh/repository';
import { DepartementModule } from '../departement/departement.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Candidat.name, schema: CandidatSchema },
    ]),
    DbParserModule,
    RepositoryModule,
    DepartementModule,
  ],
  controllers: [CandidatController],
  providers: [CandidatService],
  exports: [CandidatService],
})
export class CandidatModule {}
