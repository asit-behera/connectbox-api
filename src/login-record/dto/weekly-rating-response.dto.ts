import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class WeeklyRatingResponseDto {
  @ApiProperty({
    description: 'User ID associated with the login',
  })
  userId: string;

  @ApiPropertyOptional({
    description: 'Username of the user (null if user is deleted)',
    nullable: true,
  })
  username: string | null;

  @ApiProperty({ description: 'logedin count in the last week' })
  count: string;

  @ApiProperty({ description: 'Ranking as per the logedin count' })
  rank: string;
}
