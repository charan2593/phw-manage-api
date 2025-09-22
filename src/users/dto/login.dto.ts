import { IsNotEmpty, IsString, IsPhoneNumber, IsOptional, IsEmail } from 'class-validator';

export class LoginDto {
    @IsNotEmpty({ message: 'Email is required' })
    @IsEmail({}, { message: 'Must be valid Email' })
    email: string;

    @IsNotEmpty({ message: 'Password is required' })
    @IsString({ message: 'Password must be a string' })
    password: string;
}
