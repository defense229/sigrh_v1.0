import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IDefConfig } from './def-config.types';
import { Document } from 'mongoose';

@Schema()
export class DefConfig implements IDefConfig {
  @Prop()
  @ApiProperty()
  questions?: number;

  @Prop()
  @ApiProperty()
  optionals?: number;
}

export type DefConfigDocument = DefConfig & Document;
export const DefConfigSchema = SchemaFactory.createForClass(DefConfig);
