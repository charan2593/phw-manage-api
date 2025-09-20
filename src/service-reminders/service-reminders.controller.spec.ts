import { Test, TestingModule } from '@nestjs/testing';
import { ServiceRemindersController } from './service-reminders.controller';

describe('ServiceRemindersController', () => {
  let controller: ServiceRemindersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServiceRemindersController],
    }).compile();

    controller = module.get<ServiceRemindersController>(ServiceRemindersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
