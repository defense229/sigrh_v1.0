import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IQrcodePayload } from './qrcode-generator.types';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Qrcode implements IQrcodePayload {
  id?: string;

  @ApiProperty({ required: true })
  @Prop({ required: true })
  tag: string;

  @ApiProperty({ required: true })
  @Prop({ required: true })
  data: string;

  @Prop()
  dataUrl?: string;
}

export type QrcodeDocument = Qrcode & Document;
export const QrcodeSchema = SchemaFactory.createForClass(Qrcode);
