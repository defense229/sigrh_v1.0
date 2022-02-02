import { Module } from '@nestjs/common';
import { MbService } from './mb.service';
import { MbController } from './mb.controller';
import { CandidatModule } from '../candidat/candidat.module';
import { CandidatService } from '../candidat/candidat.service';

@Module({
  imports: [CandidatModule],
  controllers: [MbController],
  providers: [MbService, CandidatService]
})
export class MbModule { }
