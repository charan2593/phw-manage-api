import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomersModule } from './customers/customers.module';
import { PaymentsModule } from './payments/payments.module';
import { ServiceRemindersModule } from './service-reminders/service-reminders.module';
import { Customer } from './customers/customer.entity';
import { Payment } from './payments/payment.entity';
import { ServiceReminder } from './service-reminders/service-reminder.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { User } from './users/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.${process.env.NODE_ENV || 'development'}`],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get<string>('MYSQL_HOST'),
        port: config.get<number>('MYSQL_PORT'),
        username: config.get<string>('MYSQL_USERNAME'),
        password: config.get<string>('MYSQL_PASSWORD'),
        database: config.get<string>('MYSQL_DATABASE'),
        entities: [Customer, Payment, ServiceReminder, User],
        synchronize: config.get<boolean>('MYSQL_SYNC'), // disable in prod
      }),
    }),
    CustomersModule,
    PaymentsModule,
    ServiceRemindersModule,
    AuthModule
  ],
  controllers: [],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule { }
