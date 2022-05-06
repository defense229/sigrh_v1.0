import { IJury, IMember, JuryMemberRole } from './jury.types';
import mongoose, { Document } from 'mongoose';
export declare class Jury implements IJury {
    numero?: string;
    exam?: string;
    enabled: boolean;
}
export declare class Member implements IMember {
    username?: string;
    password?: string;
    jury?: string;
    exam?: string;
    departement?: string;
    role?: JuryMemberRole;
    enabled: boolean;
}
export declare type JuryDocument = Jury & Document;
export declare const JurySchema: mongoose.Schema<mongoose.Document<Jury, any, any>, mongoose.Model<mongoose.Document<Jury, any, any>, any, any, any>, any, any>;
export declare type MemberDocument = Member & Document;
export declare const MemberSchema: mongoose.Schema<mongoose.Document<Member, any, any>, mongoose.Model<mongoose.Document<Member, any, any>, any, any, any>, any, any>;
