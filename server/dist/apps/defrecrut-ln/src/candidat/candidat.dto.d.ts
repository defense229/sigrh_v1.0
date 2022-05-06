import { ICandidat } from './candidat.types';
import mongoose, { Document } from 'mongoose';
export declare class Candidat implements ICandidat {
    nom?: string;
    prenom?: string;
    sexe?: string;
    dateNaissance?: string;
    telephone?: string;
    age?: number;
    numero?: string;
    departement?: string;
    exam?: string;
    enabled: boolean;
    jury?: string;
}
export declare type CandidatDocument = Candidat & Document;
export declare const CandidatSchema: mongoose.Schema<mongoose.Document<Candidat, any, any>, mongoose.Model<mongoose.Document<Candidat, any, any>, any, any, any>, any, any>;
