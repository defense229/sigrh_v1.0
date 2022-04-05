import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Candidat, CandidatSchema } from '../candidat/candidat.schema';
import { User, UserSchema } from '../auth/user.schema';
import { ProxyService } from './proxy.service';
import { ProxyController } from './proxy.controller';

export const PROXY_BASE_URL_ =
  'https://defrecrut-backend-dot-defrecrut.ew.r.appspot.com/api/';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Candidat.name, schema: CandidatSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  providers: [ProxyService],
  controllers: [ProxyController],
})
export class ProxyModule {}
