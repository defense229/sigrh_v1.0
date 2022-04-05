import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { AuthController } from './auth.controller';
import { DbParserModule } from '@sigrh/db-parser';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema }
    ]),
    DbParserModule
  ],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {
}
