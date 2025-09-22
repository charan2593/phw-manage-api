import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import * as bcrypt from 'bcryptjs';
import { RegisterDto } from 'src/users/dto/register.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private jwtService: JwtService,
    ) { }

    async register(registeruser: RegisterDto) {
        // Check if user exists
        const existingUser = await this.userRepository.findOne({ where: { email: registeruser.email } });
        if (existingUser) {
            throw new UnauthorizedException('User already exists');
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(registeruser.password, 12);

        // Create user
        const user = this.userRepository.create({
            fullName: registeruser.fullName,
            email: registeruser.email,
            password: hashedPassword,
            role: registeruser.role,
        });

        await this.userRepository.save(user);

        // Generate token
        const payload = { fullName: user.fullName, email: user.email, sub: user.id, role: user.role };
        return {
            access_token: this.jwtService.sign(payload),
            user: { id: user.id, fullName: user.fullName, email: user.email, role: user.role },
        };
    }

    async login(email: string, password: string) {
        // Find user
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user || !user.isActive) {
            throw new UnauthorizedException('Invalid credentials');
        }

        // Check password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            throw new UnauthorizedException('Invalid credentials');
        }

        // Generate token
        const payload = { fullName: user.fullName, email: user.email, sub: user.id, role: user.role };
        return {
            access_token: this.jwtService.sign(payload),
            user: { id: user.id, fullName: user.fullName, email: user.email, role: user.role },
        };
    }

    async validateUser(payload: any): Promise<any> {
        const user = await this.userRepository.findOne({
            where: { id: payload.sub, isActive: true }
        });
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}
