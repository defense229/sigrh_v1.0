import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RepartitionService } from './repartition.service';

@ApiTags('REPARTITIONS')
@Controller('repartition')
export class RepartitionController {
  constructor(private readonly repartitionService: RepartitionService) {}

  @Get('stats/:exam/')
  async getStats(@Param('exam') exam: string) {
    console.log(exam);
    return await this.repartitionService.getStats(exam);
  }

  @Get(':exam/:departement')
  async getOne(
    @Param('exam') exam: string,
    @Param('departement') departement: string,
  ) {
    return await this.repartitionService.findOne({ exam, departement });
  }
}
