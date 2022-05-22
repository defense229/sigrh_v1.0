import { Module } from '@nestjs/common';
import { SettingService } from './setting.service';
import { SettingController } from './setting.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ExamSetting, ExamSettingSchema } from './setting.dto';
import { DbParserModule } from '@sigrh/db-parser';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ExamSetting.name, schema: ExamSettingSchema },
    ]),
    DbParserModule,
  ],
  controllers: [SettingController],
  providers: [SettingService],
  exports: [SettingService],
})
export class SettingModule {}
