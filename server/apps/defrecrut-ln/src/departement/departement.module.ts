import { Module } from '@nestjs/common';
import { DepartementService } from './departement.service';
import { DepartementController } from './departement.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Departement, DepartementSchema } from './departement.dto';
import { DbParserModule } from '@sigrh/db-parser';
import { RepositoryModule } from '@sigrh/repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Departement.name, schema: DepartementSchema },
    ]),
    DbParserModule,
    RepositoryModule,
  ],
  controllers: [DepartementController],
  providers: [DepartementService],
  exports: [DepartementService],
})
export class DepartementModule {}
