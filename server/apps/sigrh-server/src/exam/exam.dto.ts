import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { ExamStatus, IExam } from './exam.types';
import { Document, Types } from 'mongoose';

@Schema()
export class Exam implements IExam {
  id?: string;

  @ApiProperty()
  @Prop({ required: true })
  label: string;

  @Prop({ type: Types.ObjectId, ref: 'center', default: null })
  center: string;

  @Prop({ required: true, default: ExamStatus.NEW })
  status: ExamStatus;

  @Prop({ default: true })
  enabled: boolean;
}

export type ExamDocument = Exam & Document;

export const ExamSchema = SchemaFactory.createForClass(Exam);
