import { Language, LanguageSchema } from './entities/language.entity';
import { Module } from '@nestjs/common';
import { LanguagesService } from './languages.service';
import { LanguagesController } from './languages.controller';
import { DbParserModule } from '@sigrh/db-parser';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Language.name, schema: LanguageSchema },
    ]),
    DbParserModule,
  ],
  controllers: [LanguagesController],
  providers: [LanguagesService],
})
export class LanguagesModule {}
