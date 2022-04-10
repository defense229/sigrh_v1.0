import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Departement } from './departements.dto';
import { DepartementsService } from './departements.service';

@ApiTags('DEPARTEMENTS')
@Controller('departements')
export class DepartementsController {
  constructor(private readonly departementsService: DepartementsService) {}

  @Post()
  async create(@Body() departement: Departement) {
    return await this.departementsService.create(departement);
  }

  @Get(':id')
  async one(@Param('id') id: string) {
    return await this.departementsService.one(id);
  }

  @Get('exam/:id')
  async getExamDepartements(@Param('id') id: string) {
    return await this.departementsService.find({ exam: id });
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() departement: Departement) {
    return await this.departementsService.update(id, departement);
  }

  @Get()
  async all() {
    return await this.departementsService.all();
  }

  @Delete(':id')
  async archive(@Param('id') id: string) {
    return await this.departementsService.archive(id);
  }

  @Post('archive')
  async archiveMany(@Body() ids: string[]) {
    const promises = ids.map((id) => this.departementsService.archive(id));
    await Promise.all(promises);
    return { statusCode: HttpStatus.OK };
  }
}
