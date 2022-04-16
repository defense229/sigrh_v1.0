import { Controller, Get } from '@nestjs/common';
import { DefrecrutLnService } from './defrecrut-ln.service';

@Controller()
export class DefrecrutLnController {
  constructor(private readonly defrecrutLnService: DefrecrutLnService) {}

  @Get()
  getHello(): string {
    return this.defrecrutLnService.getHello();
  }
}
