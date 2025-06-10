import { Module } from '@nestjs/common';
import { UserModule } from './users/user.Module';

@Module({
  imports: [UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}