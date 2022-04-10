import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Candidat, CandidatSchema } from './candidat.schema';
import { CandidatService } from './candidat.service';
import { CandidatController } from './candidat.controller';
import { RepositoryModule } from '../repository/repository.module';
import { DbParserModule } from '@sigrh/db-parser';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Candidat.name, schema: CandidatSchema },
    ]),
    RepositoryModule,
    DbParserModule,
  ],
  providers: [CandidatService],
  controllers: [CandidatController],
  exports: [CandidatService],
})
export class CandidatModule {}
