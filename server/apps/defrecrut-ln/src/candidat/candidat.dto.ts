import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { ICandidat } from './candidat.types';
import mongoose, { Document } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Candidat implements ICandidat {
  @Prop()
  @ApiProperty()
  nom?: string;

  @Prop()
  @ApiProperty()
  prenom?: string;

  @Prop()
  @ApiProperty()
  sexe?: string;

  @Prop()
  @ApiProperty()
  dateNaissance?: string;

  @Prop()
  @ApiProperty()
  telephone?: string;

  @Prop()
  @ApiProperty()
  age?: number;

  @Prop()
  numero?: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Departement' })
  @ApiProperty()
  departement?: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Exam' })
  @ApiProperty()
  exam?: string;

  @Prop({ default: true })
  enabled: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Jury' })
  @ApiProperty()
  jury?: string;
}

export type CandidatDocument = Candidat & Document;
export const CandidatSchema = SchemaFactory.createForClass(Candidat);
