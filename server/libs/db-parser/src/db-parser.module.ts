import { Module } from '@nestjs/common';
import { DbParserService } from './db-parser.service';

@Module({
  providers: [DbParserService],
  exports: [DbParserService],
})
export class DbParserModule {}
