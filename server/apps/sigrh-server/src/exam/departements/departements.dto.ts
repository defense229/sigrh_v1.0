import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Types, Document } from 'mongoose';

@Schema()
export class Departement {
  @Prop()
  @ApiProperty()
  label: string;

  @Prop({ type: Types.ObjectId, ref: 'exam' })
  @ApiProperty()
  exam: string;
}

export type DepartementDocument = Departement & Document;

export const DepartementSchema = SchemaFactory.createForClass(Departement);
