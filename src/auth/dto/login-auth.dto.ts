import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { User } from '@prisma/client';

export class LoginDto implements Pick<User, 'email' | 'password'> {
  @ApiProperty({ example: 'john@example.com' })
  @IsEmail()
  email: string;

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
