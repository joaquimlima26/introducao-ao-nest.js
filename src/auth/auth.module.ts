import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.cotroller';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { OAuth2Client } from 'google-auth-library';
import { GoogleService } from './google-auth.service';

@Module({
  imports: [
    JwtModule.register({
      secret: 'meu_segredo',
      signOptions: {expiresIn: '1d'}
    })
  ],
  providers: [AuthService, PrismaService, JwtStrategy, GoogleService],
  controllers: [AuthController]
})
export class AuthModule {}