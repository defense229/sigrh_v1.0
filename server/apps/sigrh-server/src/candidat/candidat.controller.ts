import { Controller, Get, Param, Query } from '@nestjs/common';
import { CandidatService } from './candidat.service';
import { ApiPropertyOptional, ApiTags } from '@nestjs/swagger';

class CandidateQuery {
  @ApiPropertyOptional()
  limit?: number;

  @ApiPropertyOptional()
  skip?: number;

  @ApiPropertyOptional()
  search?: string;
}
@ApiTags('CANDIDATS')
@Controller('candidats')
export class CandidatController {
  constructor(private readonly candidatService: CandidatService) {}

  @Get()
  async all(@Query() query: CandidateQuery) {
    return await this.candidatService.all(
      Number(query.limit),
      Number(query.skip),
      query.search,
    );
  }

  @Get('/:id')
  async getOne(@Param('id') id: string) {
    return await this.candidatService.one(id);
  }

  @Get('exam/:id')
  async findExams(@Query() query: CandidateQuery, @Param('id') id: string) {
    console.log(Number(query.limit), Number(query.skip), query.search, {
      exam: id,
    });
    return await this.candidatService.all(
      Number(query.limit),
      Number(query.skip),
      query.search,
      { exam: id },
    );
  }

  @Get('exam/:id/file-collect/:type')
  async findExamsByType(
    @Query() query: CandidateQuery,
    @Param('id') id: string,
    @Param('type') type: string,
  ) {
    let condition: any;
    switch (type) {
      case 'accepted':
        condition = { accepted: true };
        break;
      case 'rejected':
        condition = { accepted: false };
        break;
      case 'sport-present':
        condition = { accepted: true, sportPresent: true };
        break;
      case 'sport-absent':
        condition = { accepted: true, sportPresent: false };
        break;
      case 'sport-accepted':
        condition = { accepted: true, sportAccept: true };
        break;
      case 'sport-rejected':
        condition = { accepted: true, sportAccept: false, sportPresent: true };
        break;
    }
    return await this.candidatService.all(
      Number(query.limit),
      Number(query.skip),
      query.search,
      { exam: id, ...condition },
    );
  }

  @Get('file-collect-stats/:id')
  async getCollectStats(@Param('id') id: string) {
    return await this.candidatService.getCollectStats(id);
  }

  @Get('file-collect-stats-all/:id')
  async getCollectStatsAll(@Param('id') id: string) {
    return await this.candidatService.getCollectStatsAll(id);
  }

  @Get('sport-stats/:id')
  async getSportStats(@Param('id') id: string) {
    return await this.candidatService.getSportStats(id);
  }

  @Get('sport-stats-all/:id')
  async getSportStatsAll(@Param('id') id: string) {
    return await this.candidatService.getSportStatsAll(id);
  }

  @Get('dec-stats/:id')
  async getDecStats(@Param('id') id: string) {
    return await this.candidatService.getDecStats(id);
  }

  @Get('all-stats/:id')
  async getAllStats(@Param('id') id: string) {
    return {
      candidateFileCollectStep: await this.candidatService.getCollectStats(id),
      sportStep: await this.candidatService.getSportStats(id),
      fileAuthenticationStep: await this.candidatService.getDecStats(id),
    };
  }
}
