import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { LoginRecordService } from './login-record.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';
import { LoginRecordResponseDto } from './dto/login-record-response.dto';
import { CurrentUser } from 'src/auth/decorators/currentUser.decorator';
import { User } from '@prisma/client';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('login-records')
export class LoginRecordController {
  constructor(private readonly loginRecordService: LoginRecordService) {}

  @Get()
  @ApiOperation({
    summary:
      'recent login records for the authenticated user or a specified user ID',
  })
  @ApiQuery({ name: 'userId', type: String, required: false })
  @ApiOkResponse({
    type: [LoginRecordResponseDto],
  })
  getLoginRecords(
    @CurrentUser() user: User,
    @Query('userId') queryUserId: string,
  ): Promise<LoginRecordResponseDto[]> {
    return this.loginRecordService.getLoginRecords(
      queryUserId ? queryUserId : user.id,
    );
  }

  @Get('weekly-login-rankings')
  @ApiOperation({ summary: 'Weekly Login Rankings' })
  @ApiResponse({
    status: 200,
    description: 'Top 20 users ranked by login count (weekly, with ties).',
  })
  getLoginRanks() {
    return this.loginRecordService.getWeeklyLoginRanking();
  }
}
