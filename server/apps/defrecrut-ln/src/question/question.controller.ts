import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ScorePayload } from '../consumers/score/score.types';
import { Question } from './question.dto';
import { QuestionService } from './question.service';

@Controller('questions')
@ApiTags('Questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post()
  async create(@Body() question: Question) {
    return await this.questionService.create(question);
  }

  @Get(':exam/:id')
  async one(@Param('id') id: string) {
    return await this.questionService.one(id);
  }

  @Post('add-score')
  async addScore(@Body() score: ScorePayload) {
    return await this.questionService.createScore(score);
  }

  @Get(':exam')
  async all(@Param('exam') exam: string) {
    return this.questionService.getAll(exam);
  }

  @Post('archive')
  async archiveMany(@Body() ids: string[]) {
    const promises = ids.map((id) => this.questionService.remove(id));
    await Promise.all(promises);
    return { statusCode: HttpStatus.OK };
  }

  @Get('results/:exam')
  async getResults(@Param('exam') exam: string) {
    return await this.questionService.getResults(exam);
  }
}
