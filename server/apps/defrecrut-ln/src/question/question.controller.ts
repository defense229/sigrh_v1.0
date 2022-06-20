import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { writeFileSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';
import { ScorePayload } from '../consumers/score/score.types';
import { Question } from './question.dto';
import { QuestionService } from './question.service';
import { genListObject } from './templates/gen-dep-array';
import { getPdfResultList } from './templates/list_des';

@Controller('questions')
@ApiTags('Questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post()
  async create(@Body() question: Question) {
    return await this.questionService.create(question);
  }

  @Get('results/:exam')
  async getResults(@Param('exam') exam: string) {
    return await this.questionService.getResults(exam);
  }

  @Get('download-list-pdf/:exam')
  async downloadListPdf(
    @Param('exam') exam: string,
    @Res() res: Response,
    @Query('name') name: string,
    @Query('departement') departement: string,
    @Query('limit') limit: string,
  ) {
    const data = await this.questionService.getResults(
      exam,
      departement,
      limit ? Number(limit) : -1,
    );
    const html = getPdfResultList(data, name);
    const buffer = await this.questionService.downloadPdf(html);
    const path = join(tmpdir(), `liste_des_retenus.pdf`);
    writeFileSync(path, Buffer.from(buffer.data));
    res.download(path);
  }

  @Get('download-list-xlsx/:exam')
  async downloadListXlsx(
    @Param('exam') exam: string,
    @Res() res: Response,
    @Query('departement') departement: string,
    @Query('limit') limit: string,
  ) {
    console.log(departement);

    const data = await this.questionService.getResults(
      exam,
      departement,
      limit ? Number(limit) : -1,
    );
    const payload = genListObject(data);
    console.log(payload);
    const buffer = await this.questionService.downloadXlsx(payload);
    const path = join(tmpdir(), `liste_des_retenus.xlsx`);
    writeFileSync(path, Buffer.from(buffer.data));
    res.download(path);
  }

  @Get(':exam/:id')
  async one(@Param('id') id: string) {
    return await this.questionService.one(id);
  }

  @Post('add-score')
  async addScore(@Body() score: ScorePayload) {
    console.log('[score]: ', score);
    return await this.questionService.createScore(score);
  }

  @Get(':exam')
  async all(@Param('exam') exam: string) {
    const result = await this.questionService.getAll(exam);
    console.log(
      result,
      result.filter((r: any) => r.enabled === true),
    );
    return result.filter((r: any) => r.enabled === true);
  }

  @Post('archive')
  async archiveMany(@Body() ids: string[]) {
    const promises = ids.map((id) => this.questionService.remove(id));
    await Promise.all(promises);
    return { statusCode: HttpStatus.OK };
  }
}
