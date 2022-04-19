import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IDepartement } from './departement.types';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Departement implements IDepartement {
  @Prop()
  @ApiProperty()
  label?: string;

  @Prop()
  @ApiProperty()
  exam?: string;

  @Prop({ default: true })
  enabled: boolean;
}

export type DepartementDocument = Departement & Document;
export const DepartementSchema = SchemaFactory.createForClass(Departement);
