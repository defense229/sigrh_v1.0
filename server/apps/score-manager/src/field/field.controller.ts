import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Field } from './field.dto';
import { FieldService } from './field.service';

@ApiTags('fields')
@Controller('fields')
export class FieldController {
  constructor(private readonly fieldService: FieldService) {}

  @Get('all')
  async all() {
    return await this.fieldService.all();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.fieldService.one(id);
  }

  @Get('exam/:id')
  async findByExam(@Param('id') id: string) {
    return await this.fieldService.findByExam(id);
  }

  @Post()
  async create(@Body() payload: Field) {
    return await this.fieldService.create(payload);
  }

  @Put(':id')
  async update(@Body() payload: Field, @Param('id') id: string) {
    return await this.fieldService.update(id, payload);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    console.log('[remove-field]', id);
    return await this.fieldService.remove(id);
  }
}
