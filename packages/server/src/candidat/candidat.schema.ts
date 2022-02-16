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
  numeroPiece: string;

  @Prop()
  adresse: string;

  @Prop()
  telephone: string;

  @Prop()
  sexe: string;

  @Prop()
  email: string;

  @Prop()
  anneeObtention: string;

  @Prop()
  lieuObtention: string;

  @Prop()
  dateEnregistrement: string;

  @Prop()
  photo: string;

  @Prop()
  acteNaissance: string;

  @Prop()
  certificatNationalite: string;

  @Prop()
  carteIdentite: string;

  @Prop()
  diplome: string;

  @Prop()
  attestationResidence: string;

  @Prop()
  casierJudiciaire: string;

  @Prop()
  certificatPositionMilitaire: string;

  @Prop()
  certificatMedicalAptitudePhysique: string;

  @Prop()
  decAccept: boolean;

  @Prop()
  decRefuse: boolean;
}

export type CandidatDocument = Candidat & Document;

export const CandidatSchema = SchemaFactory.createForClass(Candidat);


