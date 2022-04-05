import { Controller } from '@nestjs/common';
import { RepartitionService } from './repartition.service';

@Controller('repartition')
export class RepartitionController {
  constructor(private readonly repartitionService: RepartitionService) {}
}
