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
} from '@nestjs/common';
import { ApiPropertyOptional, ApiTags } from '@nestjs/swagger';
import { Exam } from './exam.dto';
import { ExamService } from './exam.service';

class ExamQuery {
  @ApiPropertyOptional()
  limit?: number;

  @ApiPropertyOptional()
  skip?: number;

  @ApiPropertyOptional()
  search?: string;
}

@Controller('exams')
@ApiTags('Exams')
export class ExamController {
  constructor(private readonly examService: ExamService) {}

  @Post()
  async create(@Body() exam: Exam) {
    return await this.examService.create(exam);
  }

  @Get(':id')
  async one(@Param('id') id: string) {
    return await this.examService.one(id);
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
}
