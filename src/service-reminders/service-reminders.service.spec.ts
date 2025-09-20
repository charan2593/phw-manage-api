import { Test, TestingModule } from '@nestjs/testing';
import { ServiceRemindersService } from './service-reminders.service';

describe('ServiceRemindersService', () => {
  let service: ServiceRemindersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServiceRemindersService],
    }).compile();

    service = module.get<ServiceRemindersService>(ServiceRemindersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
