import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Customer } from '../customers/customer.entity';

@Entity()
export class Payment {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Customer, (customer) => customer.payments, { onDelete: 'CASCADE' })
    customer: Customer;

    @Column('date')
    due_date: Date;

    @Column('decimal', { precision: 10, scale: 2 })
    deposite_amount: number;

    @Column('decimal', { precision: 10, scale: 2 })
    rent_amount: number;

    @Column('simple-array', { nullable: true })
    deposite_status: string[]; // ['PAID','NOT PAID']

    @Column('simple-array', { nullable: true })
    rent_status: string[]; // ['PAID','NOT PAID']

    @Column({ nullable: true })
    paid_date: Date;
}
