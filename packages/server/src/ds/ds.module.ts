import { Module } from '@nestjs/common';
import { DsService } from './ds.service';
import { DsController } from './ds.controller';
import { SportModule } from './sport/sport.module';

@Module({
  providers: [DsService],
  controllers: [DsController],
  imports: [SportModule]
})
export class DsModule {}
