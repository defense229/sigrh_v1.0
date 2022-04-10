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
import { Response } from 'express';
import { writeFileSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';
import { Exam } from './exam.dto';
import { ExamService } from './exam.service';
import { ExamStepStatus } from './exam.types';
import { genDepObject } from './templates/gen-dep-array';
import { getPdfList } from './templates/list';

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
    console.log(data);
    const payload = genDepObject(data);
    const buffer = await this.examService.downloadXlsx(payload);
    const path = join(tmpdir(), `repartition_${departement}.xlsx`);
    writeFileSync(path, Buffer.from(buffer.data));
    res.download(path);
  }
}
