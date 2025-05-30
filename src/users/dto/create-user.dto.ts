import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { User } from '@prisma/client';

export class CreateUserDto
  implements Pick<User, 'email' | 'username' | 'password'>
{
  @ApiProperty({ example: 'john@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '홍길동' })
  @IsString()
  @MinLength(1)
  @MaxLength(10)
  @Matches(/^[가-힣]{1,10}$/, {
    message: 'Username must be in Korean (1–10 characters)',
  })
  username: string;

  @ApiProperty({ example: 'secure#pass123' })
  @IsString()
  @MinLength(12)
  @MaxLength(20)
  @Matches(/^(?=.*[a-z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{12,20}$/, {
    message:
      'Password must be 12–20 characters long and include lowercase letters, numbers, and special characters',
  })
  password: string;
}
