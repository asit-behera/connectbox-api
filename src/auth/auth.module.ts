import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LoginRecordModule } from 'src/login-record/login-record.module';

@Global()
@Module({
  imports: [UsersModule, LoginRecordModule],
  controllers: [AuthController],
  providers: [AuthService, JwtAuthGuard],
  exports: [AuthService, JwtAuthGuard],
})
export class AuthModule {}
