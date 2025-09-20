import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BeforeInsert } from 'typeorm';
import { Payment } from '../payments/payment.entity';
import { ServiceReminder } from '../service-reminders/service-reminder.entity';

@Entity()
export class Customer {
    @PrimaryGeneratedColumn()
    internalId: number; // internal numeric ID

    @Column({ unique: true })
    customerId: string; // custom ID: phw-YYYYxx

    @Column()
    fullname: string;

    @Column({ unique: true })
    phone: string;

    @Column()
    address: string;

    @Column({ nullable: true })
    purifier_model: string;

    @Column({ nullable: true })
    start_date: Date;

    @Column()
    installation_status: string

    @OneToMany(() => Payment, (payment) => payment.customer)
    payments: Payment[];

    @OneToMany(() => ServiceReminder, (sr) => sr.customer)
    serviceReminders: ServiceReminder[];
}
