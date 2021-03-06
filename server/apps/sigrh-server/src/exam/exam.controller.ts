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
import { ScorePayload } from '../consumers/score/score.types';
import { Exam } from './exam.dto';
import { ExamService } from './exam.service';
import { ExamSetting } from './setting/setting.dto';
import { ExamQuotaUnit } from './setting/setting.types';
import {
  genDepObject,
  genListObject,
  genStatsObject,
  genSuppleantListObject,
} from './templates/gen-dep-array';
import { getPdfList } from './templates/list';
import {
  getPdfListDes,
  getPdfCodes,
  getPdfStats,
  getPdfResultList,
} from './templates/list_des';

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
    const html = getPdfListDes(result, { departement, center, room }, field_);
    console.log(html);
    const buffer = await this.examService.downloadPdf(html);
    const path = join(
      tmpdir(),
      `list_${departement}_${center}_salle_${Number(room) + 1}_${
        field_.label
      }.pdf`,
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
      `qrcodes_${departement}_${center}_salle_${Number(room) + 1}_${
        field_.label
      }.pdf`,
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

  @Get('simulation/make')
  async simulation(@Query() query: ExamSetting) {
    return await this.examService.getSimulationResult(query);
  }

  @Get('download-stats-pdf/:exam/')
  async downloadStats(@Param('exam') exam: string, @Res() res: Response) {
    const data = await this.examService.getSetting(exam);
    const html = getPdfStats(data[0].result);
    const buffer = await this.examService.downloadPdf(html);
    const path = join(tmpdir(), `statistiques.pdf`);
    writeFileSync(path, Buffer.from(buffer.data));
    res.download(path);
  }

  @Get('download-stats-xlsx/:exam')
  async downloadStatsXlsx(@Param('exam') exam: string, @Res() res: Response) {
    const data = await this.examService.getSetting(exam);
    const payload = genStatsObject(data[0].result);
    const buffer = await this.examService.downloadXlsx(payload);
    const path = join(tmpdir(), `statistiques.xlsx`);
    writeFileSync(path, Buffer.from(buffer.data));
    res.download(path);
  }

  @Get('download-list-pdf/:exam/')
  async downloadListPdf(
    @Param('exam') exam: string,
    @Res() res: Response,
    @Query('departement') departement: string,
    @Query('name') name: string,
  ) {
    const data = await this.examService.getSetting(exam);
    const fields = await this.examService.getFields(exam);
    const html = getPdfResultList(data[0].result, fields, departement, name);
    const buffer = await this.examService.downloadPdf(html);
    const path = join(tmpdir(), `liste_des_retenus.pdf`);
    writeFileSync(path, Buffer.from(buffer.data));
    res.download(path);
  }

  @Get('download-list-xlsx/:exam')
  async downloadListXlsx(
    @Param('exam') exam: string,
    @Res() res: Response,
    @Query('departement') departement: string,
  ) {
    const data = await this.examService.getSetting(exam);
    const fields = await this.examService.getFields(exam);
    const payload = genListObject(data[0].result, fields, departement);
    const buffer = await this.examService.downloadXlsx(payload);
    const path = join(tmpdir(), `liste_des_retenus.xlsx`);
    writeFileSync(path, Buffer.from(buffer.data));
    res.download(path);
  }

  @Get('download-suppleants/:exam/:nbr/:from')
  async downloadSuppleants(
    @Param('nbr') nbr: number,
    @Param('from') from: number,
    @Param('exam') exam: string,
    @Res() res: Response,
  ) {
    const data_ = await this.examService.makeSimulation(
      exam,
      true,
      Number(from) + Number(nbr),
      0,
      ExamQuotaUnit.NUMBER,
      ExamQuotaUnit.NUMBER,
      false,
    );
    const data = data_.values;
    const fields = await this.examService.getFields(exam);
    const result_ = data.slice(Number(from));
    const payload = genSuppleantListObject(result_, fields, '*', Number(from));
    const buffer = await this.examService.downloadXlsx(payload);
    const path = join(tmpdir(), `liste_des_suppleants.xlsx`);
    writeFileSync(path, Buffer.from(buffer.data));
    res.download(path);
  }
}
