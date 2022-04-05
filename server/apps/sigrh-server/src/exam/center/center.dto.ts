import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ICenter } from './center.types';
import { Document, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema({ timestamps: true })
export class Center implements ICenter {
  @ApiProperty()
  @Prop({ type: Types.ObjectId, ref: 'exams' })
  exam: string;

  @ApiProperty()
  @Prop({ minlength: 3 })
  departement: string;

  @ApiProperty()
  @Prop({ min: 0, default: 1 })
  centers: number;

  @ApiProperty()
  @Prop({ min: 0 })
  rooms: number;

  @ApiProperty()
  @Prop({ min: 0, default: null })
  candidates: number;

  @Prop({ default: true })
  enabled: boolean;
}

export class CenterUpdateInput {
  @ApiProperty({ required: false })
  @Prop({ min: 0 })
  centers: number;

  @ApiProperty({ required: false })
  @Prop({ min: 0 })
  rooms: number;
}

export type CenterDocument = Center & Document;
export const CenterSchema = SchemaFactory.createForClass(Center);
