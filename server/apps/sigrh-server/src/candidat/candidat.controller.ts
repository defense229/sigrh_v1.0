import { Controller, Get, Param, Query, Res } from '@nestjs/common';
import { CandidatService } from './candidat.service';
import { ApiPropertyOptional, ApiTags } from '@nestjs/swagger';
import { renderFileCollectStats } from './templates/file-collect';
import { ReportService } from '../consumers/report/report.service';
import { join } from 'path';
import { tmpdir } from 'os';
import { writeFileSync } from 'fs';
import { Response } from 'express';
import { renderSportStats } from './templates/sport';

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
  constructor(
    private readonly candidatService: CandidatService,
    private report: ReportService,
  ) {}

  @Get()
  async all(@Query() query: CandidateQuery) {
    return await this.candidatService.all(
      Number(query.limit),
      Number(query.skip),
      query.search,
    );
  }

  @Get('reload')
  async reload() {
    return this.candidatService.reloadCandidate();
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

  @Get('download-file-collect-stats/pdf/:id')
  async downloadFileCollectStats(
    @Param('id') id: string,
    @Res() res: Response,
  ) {
    const stats = await this.candidatService.getCollectStatsAll(id);
    const html = renderFileCollectStats(stats);
    const buffer = await this.report.downloadPdf(html);
    const path = join(tmpdir(), `stats_phase_dossier.pdf`);
    writeFileSync(path, Buffer.from(buffer.data));
    res.download(path);
  }

  @Get('sport-stats/:id')
  async getSportStats(@Param('id') id: string) {
    return await this.candidatService.getSportStats(id);
  }

  @Get('sport-stats-all/:id')
  async getSportStatsAll(@Param('id') id: string) {
    return await this.candidatService.getSportStatsAll(id);
  }

  @Get('download-sport-stats/pdf/:id')
  async downloadSportStats(@Param('id') id: string, @Res() res: Response) {
    const stats = await this.candidatService.getSportStatsAll(id);
    const html = renderSportStats(stats);
    const buffer = await this.report.downloadPdf(html);
    const path = join(tmpdir(), `stats_phase_sportive.pdf`);
    writeFileSync(path, Buffer.from(buffer.data));
    res.download(path);
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

  @Get('accept/:id')
  async accept(@Param('id') id: string) {
    return await this.candidatService.acceptCandidature(id);
  }

  @Get('reject/:id')
  async reject(@Param('id') id: string) {
    return await this.candidatService.rejectCandidature(id);
  }

  @Get('present-sport/:id')
  async presentSport(@Param('id') id: string) {
    return await this.candidatService.setIsPresent(id);
  }

  @Get('accept-sport/:id')
  async acceptSport(@Param('id') id: string) {
    return await this.candidatService.acceptAnyWay(id);
  }

  @Get('change-exam/:id/:exam')
  async changeExam(@Param('id') id: string, @Param('exam') exam: string) {
    return await this.candidatService.changeExam(id, exam);
  }
}
