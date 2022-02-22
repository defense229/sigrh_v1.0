import { Test, TestingModule } from '@nestjs/testing';
import { DsController } from './ds.controller';

describe('DsController', () => {
  let controller: DsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DsController],
    }).compile();

    controller = module.get<DsController>(DsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
