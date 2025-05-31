import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class LoginRecordResponseDto {
  @ApiProperty({ description: 'Unique ID of the login record' })
  id: number;

  @ApiProperty({
    description:
      'User ID associated with the login (nullable if user is deleted)',
  })
  userId: string | null;

  @ApiPropertyOptional({
    description: 'Username of the user (null if user is deleted)',
    nullable: true,
  })
  username: string | null;

  @ApiProperty({ description: 'IP address from which the login was made' })
  ip: string;

  @ApiProperty({
    description: 'Login timestamp in YYYY-MM-DD HH:mm:ss format',
    example: '2025-05-31 17:45:12',
  })
  loginTime: string;
}
