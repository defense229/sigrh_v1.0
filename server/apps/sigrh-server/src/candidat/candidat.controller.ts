import { Controller, Get, Param } from '@nestjs/common';
import { CandidatService } from './candidat.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('CANDIDATS')
@Controller('candidats')
export class CandidatController {
  constructor(private readonly candidatService: CandidatService) {}

  @Get()
  async index() {
    return await this.candidatService.all();
  }

  @Get('/:id')
  async getOne(@Param('id') id: string) {
    return await this.candidatService.get(id);
  }
}
