import { IsNotEmpty, IsString, IsPhoneNumber, IsOptional } from 'class-validator';

export class CreateCustomerDto {
    @IsNotEmpty({ message: 'Full Name is required' })
    @IsString({ message: 'Full Name must be a string' })
    fullname: string;

    @IsNotEmpty({ message: 'Phone number is required' })
    @IsPhoneNumber('IN', { message: 'Phone number must be valid' })
    phone: string;

    @IsOptional()
    @IsString({ message: 'Address must be a string' })
    address?: string;

    @IsNotEmpty({ message: 'Purifer Model is required' })
    @IsString({ message: 'Purifer Model must be a string' })
    purifier_model?: string;

    @IsNotEmpty({ message: 'Start Date is required' })
    @IsString({ message: 'Start Date must be a string' })
    start_date?: string;

    @IsNotEmpty({ message: 'Installation Status is required' })
    @IsString({ message: 'Installation Status must be a string' })
    installation_status?: string;
}
