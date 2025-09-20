import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomersModule } from './customers/customers.module';
import { PaymentsModule } from './payments/payments.module';
import { ServiceRemindersModule } from './service-reminders/service-reminders.module';
import { Customer } from './customers/customer.entity';
import { Payment } from './payments/payment.entity';
import { ServiceReminder } from './service-reminders/service-reminder.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306, // change if XAMPP MySQL uses another port
      username: 'root',
      password: '', // change if you set a password
      database: 'phw_manage',
      entities: [Customer, Payment, ServiceReminder],
      synchronize: true, // auto-create tables (good for dev)
    }),
    CustomersModule,
    PaymentsModule,
    ServiceRemindersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
