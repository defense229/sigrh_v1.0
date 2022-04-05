import { Controller, Get, Param } from '@nestjs/common';
import { ProxyService } from './proxy.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('PROXY: DOWNLOAD ONLINE DB COLLECTION INTO LOCAL')
@Controller('proxy')
export class ProxyController {
  constructor(private readonly service: ProxyService) {}

  @Get('users')
  async getUsers() {
    return await this.service.getUsers();
  }

  @Get('candidats')
  async getCandidates() {
    return await this.service.getCandidates();
  }

  @Get('candidats/associate-exam/:normal/:teachers/:helpers')
  async associateToExam(
    @Param('normal') normal: string,
    @Param('teachers') teachers: string,
    @Param('helpers') helpers: string,
  ) {
    return await this.service.associate(normal, teachers, helpers);
  }
}
