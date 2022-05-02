import { Module } from '@nestjs/common';
import { DefConfigService } from './def-config.service';
import { DefConfigController } from './def-config.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DefConfig, DefConfigSchema } from './def-config.dto';
import { DbParserModule } from '@sigrh/db-parser';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DefConfig.name, schema: DefConfigSchema },
    ]),
    DbParserModule,
  ],
  controllers: [DefConfigController],
  providers: [DefConfigService],
})
export class DefConfigModule {}
