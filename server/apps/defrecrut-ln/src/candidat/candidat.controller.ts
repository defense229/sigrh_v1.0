import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiPropertyOptional, ApiTags } from '@nestjs/swagger';
import { Candidat } from './candidat.dto';
import { CandidatService } from './candidat.service';

export class RepositoryQuery {
  @ApiPropertyOptional()
  limit?: number;

  @ApiPropertyOptional()
  skip?: number;

  @ApiPropertyOptional()
  search?: string;
}

@Controller('candidats')
@ApiTags('Candidats')
export class CandidatController {
  constructor(private readonly candidatService: CandidatService) {}

  @Get(':exam')
  async all(@Param('exam') exam: string, @Query() query: RepositoryQuery) {
    return this.candidatService.all(
      query.limit,
      query.skip,
      query.search,
      { exam },
      ['departement'],
    );
  }

  @Post()
  async create(@Body() candidat: Candidat) {
    const departement = await this.candidatService.getDepartement(
      candidat.exam,
      candidat.departement,
    );
    const payload = { ...candidat };
    if (departement) {
      payload.departement = departement.id;
    }
    const number_ = await this.candidatService.count({});
    payload.numero =
      String(new Date().getFullYear()).substring(2) +
      payload.sexe +
      (number_ + 1 + (candidat.numero ? Number(candidat.numero) : 0));
    return this.candidatService.create(payload);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() candidat: Candidat) {
    return this.candidatService.update(id, candidat);
  }

  @Post('archive')
  async archiveMany(@Body() ids: string[]) {
    const promises = ids.map((id) => this.candidatService.archive(id));
    await Promise.all(promises);
    return { statusCode: HttpStatus.OK };
  }

  @Get('jury/:jury')
  async getJuryCandidates(@Param('jury') jury: string) {
    console.log('[jury]', jury);
    return await this.candidatService.countJuryCandidates(jury);
  }
}
