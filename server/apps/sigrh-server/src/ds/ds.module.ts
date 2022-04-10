import { Module } from '@nestjs/common';
import { DsService } from './ds.service';
import { DsController } from './ds.controller';
import { SportModule } from './sport/sport.module';
import { DbParserModule } from '@sigrh/db-parser';

@Module({
  providers: [DsService],
  controllers: [DsController],
  imports: [SportModule, DbParserModule],
})
export class DsModule {}
