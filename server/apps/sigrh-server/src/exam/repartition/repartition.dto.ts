import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IRepartition } from './repartition.types';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Repartition implements IRepartition {
  id?: string;

  @ApiProperty()
  @Prop({ type: Types.ObjectId, ref: 'exams' })
  exam: string;

  @ApiProperty()
  @Prop()
  departement: string;

  @ApiProperty()
  @Prop({ type: Object, default: {} })
  repartition: any;
}

export type RepartitionDocument = Repartition & Document;
export const RepartitionSchema = SchemaFactory.createForClass(Repartition);
