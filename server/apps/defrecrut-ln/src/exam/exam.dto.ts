import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import { IExam } from './exam.types';

@Schema({ timestamps: true })
export class Exam implements IExam {
  @Prop()
  @ApiProperty()
  label?: string;

  @Prop({ default: true })
  enabled: boolean;
}

export type ExamDocument = Exam & Document;
export const ExamSchema = SchemaFactory.createForClass(Exam);
