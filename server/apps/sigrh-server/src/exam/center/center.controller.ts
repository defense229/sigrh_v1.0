import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  HttpStatus,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Center, CenterUpdateInput } from './center.dto';
import { CenterService } from './center.service';

@ApiTags('CENTERS')
@Controller('centers')
export class CenterController {
  constructor(private readonly centerService: CenterService) {}
  @Post()
  async create(@Body() center: Center) {
    return await this.centerService.create(center);
  }

  @Get(':id')
  async one(@Param('id') id: string) {
    return await this.centerService.one(id);
  }

  @Get('exam/:id')
  async getExamCenters(@Param('id') id: string) {
    return await this.centerService.find({ exam: id });
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() center: CenterUpdateInput) {
    return await this.centerService.update(id, center);
  }

  @Get()
  async all() {
    return await this.centerService.all();
  }

  @Delete(':id')
  async archive(@Param('id') id: string) {
    return await this.centerService.archive(id);
  }

  @Post('archive')
  async archiveMany(@Body() ids: string[]) {
    const promises = ids.map((id) => this.centerService.archive(id));
    await Promise.all(promises);
    return { statusCode: HttpStatus.OK };
  }
}
