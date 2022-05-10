import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserRoles } from './user_.dto';
import { ApiProperty } from '@nestjs/swagger';

@Schema({ timestamps: true })
export class User {
  @ApiProperty()
  @Prop()
  username: string;

  @ApiProperty()
  @Prop()
  password: string;

  @ApiProperty({ enum: UserRoles })
  @Prop({ enum: UserRoles })
  role: string;

  @Prop({ required: false })
  @ApiProperty({ required: false })
  departement: string;
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);
