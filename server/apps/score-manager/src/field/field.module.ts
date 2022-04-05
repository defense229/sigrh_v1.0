import { Module } from '@nestjs/common';
import { FieldService } from './field.service';
import { FieldController } from './field.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Field, FieldSchema } from './field.dto';
import { DbParserModule } from '@sigrh/db-parser';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Field.name, schema: FieldSchema }]),
    DbParserModule,
  ],
  controllers: [FieldController],
  providers: [FieldService],
})
export class FieldModule {}
