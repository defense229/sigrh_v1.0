import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Repository {}

export type RepositoryDocument = Document & Repository;

export const RepositorySchema = SchemaFactory.createForClass(Repository);
