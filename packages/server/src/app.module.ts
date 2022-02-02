import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CandidatModule } from './candidat/candidat.module';
import { MbModule } from './mb/mb.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/sigrh_v1'),
    AuthModule,
    CandidatModule,
    MbModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
