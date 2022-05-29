import { ApiTags } from '@nestjs/swagger';
import { Language } from './entities/language.entity';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { LanguagesService } from './languages.service';

@ApiTags('Langues')
@Controller('languages')
export class LanguagesController {
  constructor(private readonly languagesService: LanguagesService) {}

  @Post()
  async create(@Body() createLanguageDto: Language) {
    return await this.languagesService.create(createLanguageDto);
  }

  @Get()
  async findAll() {
    return await this.languagesService.all();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.languagesService.one(id);
  }

  @Get('exam/:id')
  async find(@Param('id') id: string) {
    return await this.languagesService.find({ exam: id });
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateLanguageDto: Language) {
    return await this.languagesService.update(id, updateLanguageDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.languagesService.archive(id);
  }

  @Post('archive')
  async archiveMany(@Body() ids: string[]) {
    const promises = ids.map((id) => this.languagesService.archive(id));
    await Promise.all(promises);
    return { statusCode: HttpStatus.OK };
  }
}
