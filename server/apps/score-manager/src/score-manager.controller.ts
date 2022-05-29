import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Score } from './score-manager.dto';
import { ScoreManagerService } from './score-manager.service';

@ApiTags('scores')
@Controller('scores')
export class ScoreManagerController {
  constructor(private readonly scoreManagerService: ScoreManagerService) {}

  @Get('exam/:id')
  async examsNotes(@Param('id') id: string) {
    return await this.scoreManagerService.findByExam(id);
  }

  @Get('results/:exam/:candidate')
  async examsNotesForCandidate(
    @Param('exam') exam: string,
    @Param('candidate') candidate: string,
  ) {
    return await this.scoreManagerService.getCandidateScore(exam, candidate);
  }

  @Post()
  async create(@Body() payload: Score) {
    console.log('[score-payload]', payload);
    return await this.scoreManagerService.save(payload);
  }

  @Get('count-scores/exam/:id')
  async countScore(
    @Param('id') exam: string,
    @Query('field') field: string = 'ALL',
  ) {
    return await this.scoreManagerService.countByExam(exam, field);
  }

  @Get('computed/:exam')
  async computeScores(
    @Param('exam') exam: string,
    @Query('sort') sort: 'ASC' | 'DESC' | 'NONE' = 'NONE',
  ) {
    console.log('[computing-ctrl]');
    return await this.scoreManagerService.computeExamScore(
      exam,
      sort === 'ASC' || sort === 'DESC',
      sort === 'DESC',
    );
  }

  @Get('field-candidate-score/:field/:candidate')
  async getScoreByFieldAndCandidate(
    @Param('field') field: string,
    @Param('candidate') candidate: string,
  ) {
    return await this.scoreManagerService.getScoreByFieldAndCandidate(
      field,
      candidate,
    );
  }

  @Delete('remove-score/:id')
  async removeScore(@Param('id') id: string) {
    return await this.scoreManagerService.removeScore(id);
  }
}
