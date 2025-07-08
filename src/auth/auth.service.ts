import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterUserDto } from './dto/resgister.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        // private jwt: JwtService,
        private prisma: PrismaService
    ) {}

    async register(data: RegisterUserDto) {
        const userExists = await this.prisma.user.findUnique({
            where: {email: data.email}
    })

    if(userExists) {
        throw new ConflictException("Usuário já cadastrado com esse email.");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const newUser = await this.prisma.user.create({
        data: {
            name: data.name,
            email: data.email,
            password: hashedPassword
        },
        select: {
            id: true,
            name: true,
            email: true,
            role: true
        }
    })

    return newUser
}}