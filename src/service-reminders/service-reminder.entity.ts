import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Customer } from '../customers/customer.entity';

@Entity()
export class ServiceReminder {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Customer, (customer) => customer.serviceReminders, { onDelete: 'CASCADE' })
    customer: Customer;

    @Column()
    service_date: Date;

    @Column()
    service_type: string;

    @Column({ type: 'enum', enum: ['Pending', 'Completed'], default: 'Pending' })
    status: string;
}
