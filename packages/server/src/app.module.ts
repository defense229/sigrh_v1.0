import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CandidatModule } from './candidat/candidat.module';
import { MbModule } from './mb/mb.module';
import { DsModule } from './ds/ds.module';
import { ProxyModule } from './proxy/proxy.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/sigrh_v1_dev'),
    AuthModule,
    CandidatModule,
    MbModule,
    DsModule,
    ProxyModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
