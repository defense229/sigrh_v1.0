import { Test, TestingModule } from '@nestjs/testing';
import { DefConfigController } from './def-config.controller';
import { DefConfigService } from './def-config.service';

describe('DefConfigController', () => {
  let controller: DefConfigController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DefConfigController],
      providers: [DefConfigService],
    }).compile();

    controller = module.get<DefConfigController>(DefConfigController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
