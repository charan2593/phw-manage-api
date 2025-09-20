import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { Customer } from './customer.entity';
import { CreateCustomerDto } from './create-customer.dto';

@Controller('customers')  // ← this defines the route prefix
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get()
  getAll() {
    return this.customersService.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.customersService.findOne(id);
  }

  @Post()
  create(@Body() customer: CreateCustomerDto) {
    return this.customersService.create(customer);
  }
}
