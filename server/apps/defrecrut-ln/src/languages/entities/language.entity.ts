import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

@Schema()
export class Language {
  @Prop()
  @ApiProperty()
  label: string;

  @Prop()
  @ApiProperty()
  exam: string;

  @Prop({ default: true })
  enabled: boolean;
}

export type LanguageDocument = Language & Document;
export const LanguageSchema = SchemaFactory.createForClass(Language);
