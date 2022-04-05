import { Test, TestingModule } from '@nestjs/testing';
import { DbParserService } from './db-parser.service';

describe('DbParserService', () => {
  let service: DbParserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DbParserService],
    }).compile();

    service = module.get<DbParserService>(DbParserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
