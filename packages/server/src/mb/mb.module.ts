import { Module } from '@nestjs/common';
import { MbService } from './mb.service';
import { MbController } from './mb.controller';
import { CandidatService } from '../candidat/candidat.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Candidat, CandidatSchema } from '../candidat/candidat.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Candidat.name, schema: CandidatSchema }
    ])
  ],
  controllers: [MbController],
  providers: [MbService, CandidatService]
})
export class MbModule { }
