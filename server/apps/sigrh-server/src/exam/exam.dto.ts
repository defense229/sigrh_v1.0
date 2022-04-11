import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import {
  ExamRepartitionStatus,
  ExamStatus,
  ExamStepStatus,
  IExam,
} from './exam.types';
import { Document, Types } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Exam implements IExam {
  id?: string;

  @ApiProperty()
  @Prop({ required: true })
  label: string;

  @Prop({ type: Types.ObjectId, ref: 'center', default: null })
  center: string;

  @Prop({ required: true, default: ExamStatus.NEW })
  status: ExamStatus;

  @Prop({ default: ExamStepStatus.INACTIVE })
  candidateFileCollectStep: ExamStepStatus;

  @Prop({ default: ExamStepStatus.INACTIVE })
  sportStep: ExamStepStatus;

  @Prop({ default: ExamStepStatus.INACTIVE })
  fileAuthenticationStep: ExamStepStatus;

  @Prop({ default: ExamStepStatus.INACTIVE })
  writingStep: ExamStepStatus;

  @Prop({ default: ExamStepStatus.INACTIVE })
  healthControlStep: ExamStepStatus;

  @Prop({ default: true })
  enabled: boolean;
}

export type ExamDocument = Exam & Document;

export const ExamSchema = SchemaFactory.createForClass(Exam);
