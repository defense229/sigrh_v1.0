import { Module } from '@nestjs/common';
import { DepartementsService } from './departements.service';
import { DepartementsController } from './departements.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Departement, DepartementSchema } from './departements.dto';
import { RepositoryModule } from '../../repository/repository.module';
import { DbParserModule } from '@sigrh/db-parser';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Departement.name, schema: DepartementSchema },
    ]),
    RepositoryModule,
    DbParserModule,
  ],
  controllers: [DepartementsController],
  providers: [DepartementsService],
})
export class DepartementsModule {}
