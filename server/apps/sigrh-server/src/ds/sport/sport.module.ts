import { Module } from '@nestjs/common';
import { SportService } from './sport.service';
import { SportController } from './sport.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Candidat, CandidatSchema } from '../../candidat/candidat.schema';
import { CandidatService } from '../../candidat/candidat.service';
import { DbParserModule } from '@sigrh/db-parser';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Candidat.name, schema: CandidatSchema },
    ]),
    DbParserModule,
  ],
  providers: [SportService, CandidatService],
  controllers: [SportController],
})
export class SportModule {}
