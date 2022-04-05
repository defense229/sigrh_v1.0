import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ScoreService } from '../consumers/score/score.service';
import { FieldPayload } from '../consumers/score/score.types';

@ApiTags('FIELDS (Matieres)')
@Controller('fields')
export class FieldController {
  constructor(private service: ScoreService) {}

  @Get(':exam')
  async all(@Param('exam') exam: string) {
    return await this.service.getFields(exam);
  }

  @Post()
  async create(@Body() field: FieldPayload) {
    return await this.service.addField(field);
  }
}
