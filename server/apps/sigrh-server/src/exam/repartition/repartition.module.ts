import { Module } from '@nestjs/common';
import { RepartitionService } from './repartition.service';
import { RepartitionController } from './repartition.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Repartition, RepartitionSchema } from './repartition.dto';
import { RepositoryModule } from '../../repository/repository.module';
import { DbParserModule } from '@sigrh/db-parser';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Repartition.name, schema: RepartitionSchema },
    ]),
    RepositoryModule,
    DbParserModule,
  ],
  controllers: [RepartitionController],
  providers: [RepartitionService],
  exports: [RepartitionService],
})
export class RepartitionModule {}
