import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Candidat {

  @Prop()
  demobilise: string;

  @Prop()
  numeroDepotDossier: string;

  @Prop()
  numero: string;

  @Prop()
  accepted: boolean;

  @Prop()
  rejected: boolean;

  @Prop()
  sportPresent: boolean;

  @Prop()
  sportAccept: boolean;

  @Prop()
  motif: string;

  @Prop()
  nom: string;

  @Prop()
  prenom: string;

  @Prop()
  departement: string;

  @Prop()
  dateNaissance: string;

  @Prop()
  lieuNaissance: string;

  @Prop()
  diplomePresente: string;

  @Prop()
  numeroPiece: number;
}

export type CandidatDocument = Candidat & Document;

export const CandidatSchema = SchemaFactory.createForClass(Candidat);


