import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { ExamQuotaUnit, IExamSetting } from './setting.types';
import { Types } from 'mongoose';

@Schema()
export class ExamSetting implements IExamSetting {
  @ApiProperty({ required: false })
  @Prop({ required: false })
  take: number;

  @ApiProperty({ enum: ExamQuotaUnit, default: ExamQuotaUnit.PERCENT })
  @Prop({ enum: ExamQuotaUnit, default: ExamQuotaUnit.PERCENT })
  quotaUnit: ExamQuotaUnit;

  @ApiProperty({ type: Object, required: false })
  @Prop({ type: Object, required: false })
  mapping: Record<string, number>;

  @ApiProperty({ enum: ExamQuotaUnit, default: ExamQuotaUnit.PERCENT })
  @Prop({ enum: ExamQuotaUnit, default: ExamQuotaUnit.PERCENT })
  wmQuotaUnit: ExamQuotaUnit;

  @ApiProperty({ required: false })
  @Prop({ required: false })
  wmQuota: number;

  @ApiProperty()
  @Prop({ default: false })
  isDefinitive: boolean;

  @ApiProperty()
  @Prop({ type: Types.ObjectId, ref: 'exams' })
  exam: string;

  @ApiProperty()
  @Prop({ default: false })
  considerAllField: boolean;

  @Prop({ required: false })
  codeMinistre?: string;

  @Prop({ required: false })
  codeDopa?: string;

  @Prop({ type: Object, required: false })
  result?: any;
}

export type ExamSettingDocument = ExamSetting & Document;

export const ExamSettingSchema = SchemaFactory.createForClass(ExamSetting);
