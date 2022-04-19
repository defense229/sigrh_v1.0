import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IQuestion } from './question.types';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Question implements IQuestion {
  @Prop()
  @ApiProperty()
  label?: string;

  @Prop()
  @ApiProperty()
  exam?: string;

  @Prop({ default: true })
  enabled: boolean;
}

export type QuestionDocument = Question & Document;
export const QuestionSchema = SchemaFactory.createForClass(Question);
