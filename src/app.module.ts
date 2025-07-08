import { Module } from '@nestjs/common';
import { UserModule } from './users/user.Module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule, PrismaModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}