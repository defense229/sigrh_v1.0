import { Test, TestingModule } from '@nestjs/testing';
import { DefConfigService } from './def-config.service';

describe('DefConfigService', () => {
  let service: DefConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DefConfigService],
    }).compile();

    service = module.get<DefConfigService>(DefConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
