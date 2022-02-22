import { Test, TestingModule } from '@nestjs/testing';
import { DsService } from './ds.service';

describe('DsService', () => {
  let service: DsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DsService],
    }).compile();

    service = module.get<DsService>(DsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
