import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { ApiPropertyOptional, ApiTags } from '@nestjs/swagger';
import { createRunner } from '@sigrh/runner';
import { Response } from 'express';
import { writeFileSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';
import { ScorePayload } from '../consumers/score/score.types';
import { Exam } from './exam.dto';
import { ExamService } from './exam.service';
import { genDepObject, genListArray } from './templates/gen-dep-array';
import { getPdfList } from './templates/list';
import { getPdfListDes, getPdfCodes } from './templates/list_des';

class ExamQuery {
  @ApiPropertyOptional()
  limit?: number;

  @ApiPropertyOptional()
  skip?: number;

  @ApiPropertyOptional()
  search?: string;
}

@ApiTags('EXAMS')
@Controller('exams')
export class ExamController {
  constructor(private readonly examService: ExamService) {}
  @Post()
  async create(@Body() exam: Exam) {
    return await this.examService.create(exam);
  }

  @Get('repartition/:exam/:departement')
  async getRepartition(
    @Param('exam') exam: string,
    @Param('departement') departement: string,
  ) {
    return await this.examService.getRepartition(exam, departement);
  }

  @Post('create-repartition/:id')
  async createRepartition(@Param('id') id: string) {
    return await this.examService.createRepartition(id);
  }

  @Get(':id')
  async one(@Param('id') id: string) {
    return await this.examService.one(id);
  }

  @Get('active-step/:id/:step')
  async activeStep(@Param('id') id: string, @Param('step') step: string) {
    return await this.examService.activeStep(id, step);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() exam: Exam) {
    return await this.examService.update(id, exam);
  }

  @Delete(':id')
  async archive(@Param('id') id: string) {
    return await this.examService.archive(id);
  }

  @Post('archive')
  async archiveMany(@Body() ids: string[]) {
    const promises = ids.map((id) => this.examService.archive(id));
    await Promise.all(promises);
    return { statusCode: HttpStatus.OK };
  }

  @Get()
  async all(@Query() query: ExamQuery) {
    return await this.examService.all(
      Number(query.limit),
      Number(query.skip),
      query.search,
    );
  }

  @Get('download-repartition/pdf/:exam/:departement')
  async downloadRepartition(
    @Param('exam') exam: string,
    @Param('departement') departement: string,
    @Res() res: Response,
  ) {
    const data = await this.examService.getRepartition(exam, departement);
    const html = getPdfList(data);

    console.log(html);
    const buffer = await this.examService.downloadPdf(html);
    const path = join(tmpdir(), `repartition_${departement}.pdf`);
    writeFileSync(path, Buffer.from(buffer.data));
    res.download(path);
  }

  @Get('download-repartition/xlsx/:exam/:departement')
  async downloadXlsx(
    @Param('exam') exam: string,
    @Param('departement') departement: string,
    @Res() res: Response,
  ) {
    const data = await this.examService.getRepartition(exam, departement);
    const payload = genDepObject(data);
    const buffer = await this.examService.downloadXlsx(payload);
    const path = join(tmpdir(), `repartition_${departement}.xlsx`);
    writeFileSync(path, Buffer.from(buffer.data));
    res.download(path);
  }

  @Get('download-repartition/list/:exam/:departement/:field/:center/:room')
  async downloadList(
    @Param('exam') exam: string,
    @Param('departement') departement: string,
    @Param('field') field: string,
    @Param('center') center: string,
    @Param('room') room: string,
    @Res() res: Response,
  ) {
    const data = await this.examService.getRepartition(exam, departement);
    const result = data[center][Number(room)];
    const field_ = await this.examService.getField(field);
    console.log(field_);
    const html = getPdfListDes(result, { departement, center, room }, field_);
    const buffer = await this.examService.downloadPdf(html);
    const path = join(
      tmpdir(),
      `list_${departement}_${center}_salle_${room + 1}_${field_.label}.pdf`,
    );
    writeFileSync(path, Buffer.from(buffer.data));
    res.download(path);
  }

  @Get('download-repartition/code/:exam/:departement/:field/:center/:room')
  async downloadCodes(
    @Param('exam') exam: string,
    @Param('departement') departement: string,
    @Param('field') field: string,
    @Param('center') center: string,
    @Param('room') room: string,
    @Res() res: Response,
  ) {
    const data = await this.examService.getRepartition(exam, departement);
    const result = data[center][Number(room)];
    const html = getPdfCodes(result, field);
    const field_ = await this.examService.getField(field);
    const buffer = await this.examService.downloadPdf(html, {
      margin: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      },
    });
    const path = join(
      tmpdir(),
      `qrcodes_${departement}_${center}_salle_${room + 1}_${field_.label}.pdf`,
    );
    writeFileSync(path, Buffer.from(buffer.data));
    res.download(path);
  }

  @Post('add-score')
  async addScore(@Body() payload: ScorePayload) {
    await this.examService.addScore(payload);
    return { status: HttpStatus.OK };
  }

  @Get('count-scores/:exam/:field')
  async countScores(
    @Param('exam') exam: string,
    @Param('field') field: string,
  ) {
    return await this.examService.countInsertedScores(exam, field);
  }

  @Get('results/:exam')
  async getResults(@Param('exam') exam: string) {
    console.log(exam);
    return await this.examService.getScoreResults(exam, 'DESC');
  }
}
