import { Controller, Get } from "@nestjs/common";
import { CandidatService } from "./candidat.service";
import { ApiTags } from '@nestjs/swagger';

@ApiTags('CANDIDATS')
@Controller('api/candidats')
export class CandidatController {

  constructor(private readonly candidatService: CandidatService) { }

  @Get()
  async index() {
    return await this.candidatService.all();
  }

}