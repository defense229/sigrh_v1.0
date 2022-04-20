import { Module } from '@nestjs/common';
import { JuryService, MemberService } from './jury.service';
import { JuryController } from './jury.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RepositoryModule } from '@sigrh/repository';
import { DbParserModule } from '@sigrh/db-parser';
import { Jury, JurySchema, Member, MemberSchema } from './jury.dto';
import { CandidatModule } from '../candidat/candidat.module';
import { WebsocketModule } from '@sigrh/websocket';
import { QuestionModule } from '../question/question.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Jury.name, schema: JurySchema },
      { name: Member.name, schema: MemberSchema },
    ]),
    RepositoryModule,
    DbParserModule,
    CandidatModule,
    WebsocketModule,
    QuestionModule
  ],
  controllers: [JuryController],
  providers: [JuryService, MemberService],
})
export class JuryModule {}
