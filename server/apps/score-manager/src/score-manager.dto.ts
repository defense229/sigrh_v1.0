import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose from 'mongoose';
import { Document } from 'mongoose';
import { IScore } from './score-manager.types';

@Schema()
export class Score implements IScore {
  id?: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Field',
  })
  @ApiProperty({ required: true })
  field: string;

  @Prop({ required: true })
  @ApiProperty({ required: true, minLength: 3 })
  candidate: string;

  @Prop({ required: true, minlength: 3 })
  @ApiProperty({ required: true })
  exam: string;

  @ApiProperty({
    required: true,
    type: Number,
  })
  @Prop({ required: true, min: 0, max: 20 })
  value: number;
}

export type ScoreDocument = Score & Document;
export const ScoreSchema = SchemaFactory.createForClass(Score);
