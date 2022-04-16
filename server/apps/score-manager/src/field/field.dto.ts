import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IField } from './field.type';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Field implements IField {
  @ApiProperty({ required: true })
  @Prop({ required: true, minlength: 3 })
  label: string;

  @ApiProperty({ required: true })
  @Prop({ required: true, min: 0 })
  coefficient: number;

  @ApiProperty({ required: true })
  @Prop({ required: true, minlength: 3 })
  exam: string;

  @ApiProperty({ required: false })
  @Prop({ type: Object })
  extras?: Record<string, any>;
}

export type FieldDocument = Field & Document;
export const FieldSchema = SchemaFactory.createForClass(Field);
