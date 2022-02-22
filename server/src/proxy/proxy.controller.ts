import { Controller, Get } from '@nestjs/common';
import { ProxyService } from './proxy.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('PROXY: DOWNLOAD ONLINE DB COLLECTION INTO LOCAL')
@Controller('api/proxy')
export class ProxyController {
  constructor(
    private readonly service: ProxyService
  ) {}

  @Get('users')
  async getUsers() {
    return await this.service.getUsers();
  }

  @Get('candidats')
  async getCandidates() {
    return await this.service.getCandidates();
  }
}
