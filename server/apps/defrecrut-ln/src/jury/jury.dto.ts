import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IJury, IMember } from './jury.types';
import mongoose, { Document } from 'mongoose';

@Schema()
export class Jury implements IJury {
  @Prop()
  @ApiProperty()
  numero?: string;

  @Prop()
  @ApiProperty()
  exam?: string;

  @Prop({ default: true })
  enabled: boolean;
}

@Schema({ timestamps: true })
export class Member implements IMember {
  @Prop()
  @ApiProperty()
  username?: string;

  @Prop()
  @ApiProperty()
  password?: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Jury' })
  @ApiProperty()
  jury?: string;

  @Prop()
  @ApiProperty()
  exam?: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Departement' })
  @ApiProperty()
  departement?: string;

  @Prop({ default: true })
  enabled: boolean;
}

export type JuryDocument = Jury & Document;
export const JurySchema = SchemaFactory.createForClass(Jury);

export type MemberDocument = Member & Document;
export const MemberSchema = SchemaFactory.createForClass(Member);
