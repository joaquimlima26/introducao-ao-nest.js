import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto'

@Injectable()
export class AuthService {
    constructor(private jwt: JwtService, private prisma: PrismaService) { }

    async validateUser(email: string, password: string) {
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user) throw new UnauthorizedException('Credenciais inválidas');

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new UnauthorizedException('Credenciais inválidas');

        return user;
    }

    async login(dto: LoginDto) {
        const user = await this.validateUser(dto.email, dto.password);

        const payload = {
            sub: user.id,
            role: user.role,
            email: user.email,
        };

        return {
            access_token: this.jwt.sign(payload),
        };
    }

    async register(dto: RegisterDto) {
        const userExists = await this.prisma.user.findUnique({
            where: { email: dto.email },
        });

        if (userExists) {
            throw new ConflictException('Email já está em uso');
        }

        const hashedPassword = await bcrypt.hash(dto.password, 10);

        const user = await this.prisma.user.create({
            data: {
                name: dto.name,
                email: dto.email,
                password: hashedPassword,
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
            },
        });

        return user;
    }
}