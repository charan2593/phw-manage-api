import { Controller, Get, Post, Body, Param, Put, UseGuards, Request } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Customer } from './customer.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('customers')
@Controller('customers')  // ← this defines the route prefix
export class CustomersController {
  constructor(private readonly customersService: CustomersService) { }

  @Get()
  @ApiResponse({ status: 200, description: 'Get All Customers', type: [Customer] })
  getAll() {
    return this.customersService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Get Customer by id', type: Customer })
  @ApiResponse({ status: 404, description: 'Customer not found' })
  getOne(@Param('id') id: number) {
    return this.customersService.findOne(id);
  }

  @Post()
  @ApiResponse({ status: 200, description: 'Create New Customer', type: Customer })
  @UseGuards(JwtAuthGuard)
  create(@Body() customer: CreateCustomerDto, @Request() req) {
    const user = req.user;
    return this.customersService.create(customer, user);
  }

  @Put(':id')
  @ApiResponse({ status: 200, description: 'Customer updated', type: Customer })
  @ApiResponse({ status: 404, description: 'Customer not found' })
  async update(
    @Param('id') id: number,
    @Body() updateDto: UpdateCustomerDto,
  ): Promise<Customer> {
    return this.customersService.update(id, updateDto);
  }
}
