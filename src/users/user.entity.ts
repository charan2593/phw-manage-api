import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Customer } from '../customers/customer.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    fullName: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({ default: 'user' })
    role: string; // 'admin', 'user', 'manager'

    @Column({ default: true })
    isActive: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => Customer, customer => customer.createdBy)
    customers: Customer[];
}
