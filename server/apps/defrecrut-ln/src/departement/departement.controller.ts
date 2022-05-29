import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Departement } from './departement.dto';
import { DepartementService } from './departement.service';

@Controller('departements')
@ApiTags('Départements')
export class DepartementController {
  constructor(private readonly departementService: DepartementService) {}

  @Get(':id')
  async one(@Param('id') id: string) {
    return this.departementService.one(id);
  }

  @Get('exam/:exam')
  async all(@Param('exam') exam: string) {
    return this.departementService.find({ exam });
  }

  @Post()
  async create(@Body() departement: Departement) {
    return this.departementService.create(departement);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() departement: Departement) {
    return this.departementService.update(id, departement);
  }

  @Post('archive')
  async archiveMany(@Body() ids: string[]) {
    const promises = ids.map((id) => this.departementService.archive(id));
    await Promise.all(promises);
    return { statusCode: HttpStatus.OK };
  }
}
