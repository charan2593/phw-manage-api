import { IsNotEmpty, IsString, IsPhoneNumber, IsOptional, IsEmail } from 'class-validator';

export class RegisterDto {
    @IsNotEmpty({ message: 'Full Name is required' })
    @IsString({ message: 'Full Name must be a string' })
    fullName: string;

    @IsNotEmpty({ message: 'Email is required' })
    @IsEmail({}, { message: 'Must be valid Email' })
    email: string;

    @IsNotEmpty({ message: 'Password is required' })
    @IsString({ message: 'Password must be a string' })
    password: string;

    @IsNotEmpty({ message: 'Role is required' })
    @IsString({ message: 'Role must be a string' })
    role: string;

    @IsOptional()
    isActive?: string;

    @IsOptional()
    createdAt?: string;

    @IsOptional()
    updatedAt?: string;
}
