import { Module } from '@nestjs/common';
import { ServiceRemindersService } from './service-reminders.service';
import { ServiceRemindersController } from './service-reminders.controller';

@Module({
  providers: [ServiceRemindersService],
  controllers: [ServiceRemindersController]
})
export class ServiceRemindersModule {}
