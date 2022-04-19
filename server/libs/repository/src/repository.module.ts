import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DbParserModule } from '@sigrh/db-parser';
import { Repository, RepositorySchema } from './repository.dto';
import { RepositoryService } from './repository.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Repository.name, schema: RepositorySchema },
    ]),
    DbParserModule,
  ],
  providers: [RepositoryService],
  exports: [RepositoryService],
})
export class RepositoryModule {}
