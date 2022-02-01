import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose';
import { Candidat, CandidatSchema } from './candidat.schema';
import { CandidatService } from './candidat.service';
import { CandidatController } from './candidat.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Candidat.name, schema: CandidatSchema }
    ])
  ],
  providers: [CandidatService],
  controllers: [CandidatController]
})
export class CandidatModule { }