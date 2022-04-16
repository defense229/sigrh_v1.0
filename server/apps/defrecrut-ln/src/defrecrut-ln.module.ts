import { Module } from '@nestjs/common';
import { DefrecrutLnController } from './defrecrut-ln.controller';
import { DefrecrutLnService } from './defrecrut-ln.service';

@Module({
  imports: [],
  controllers: [DefrecrutLnController],
  providers: [DefrecrutLnService],
})
export class DefrecrutLnModule {}
