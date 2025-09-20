import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './customer.entity';
import { CreateCustomerDto } from './create-customer.dto';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private customersRepository: Repository<Customer>,
  ) { }

  findAll(): Promise<Customer[]> {
    return this.customersRepository.find({ relations: ['payments', 'serviceReminders'] });
  }

  async findOne(id: number): Promise<Customer> {
    try {
      const customer = await this.customersRepository.findOne({ where: { internalId: id }, relations: ['payments', 'serviceReminders'] });
      if (!customer) {
        throw new NotFoundException(`Customer with ID ${id} not found`);
      }
      return customer;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async create(customer: CreateCustomerDto): Promise<Customer> {
    try {
      const savedCustomer = await this.customersRepository.save(customer);
      // generate custom customerId like phw-YYYYxx
      savedCustomer.customerId = `phw-${new Date().getFullYear()}${String(savedCustomer.internalId).padStart(2, '0')}`;
      await this.customersRepository.update(savedCustomer.internalId, {
        customerId: savedCustomer.customerId,
      });
      return savedCustomer;
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY' || error.errno === 1062) {
        throw new ConflictException('Phone number already exists');
      }
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async update(id: number, data: Partial<Customer>): Promise<Customer> {
    try {
      await this.customersRepository.update(id, data);
      return this.findOne(id);
    } catch (error) {
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  // async remove(id: number): Promise<void> {
  //   await this.customersRepository.delete(id);
  // }
}
