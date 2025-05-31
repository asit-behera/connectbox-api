import { Module } from '@nestjs/common';
import { LoginRecordService } from './login-record.service';
import { LoginRecordController } from './login-record.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [LoginRecordController],
  providers: [LoginRecordService],
  exports: [LoginRecordService],
})
export class LoginRecordModule {}
