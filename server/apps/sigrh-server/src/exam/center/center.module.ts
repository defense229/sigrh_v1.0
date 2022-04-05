import { Module } from '@nestjs/common';
import { CenterService } from './center.service';
import { CenterController } from './center.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Center, CenterSchema } from './center.dto';
import { DbParserModule } from '@sigrh/db-parser';
import { RepositoryModule } from '../../repository/repository.module';
import { WebsocketModule } from '@sigrh/websocket';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Center.name, schema: CenterSchema }]),
    DbParserModule,
    RepositoryModule,
    WebsocketModule,
  ],
  controllers: [CenterController],
  providers: [CenterService],
  exports: [CenterService],
})
export class CenterModule {}
