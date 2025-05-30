import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import {
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiPropertyOptional({ example: '새사용자' })
  @IsOptional()
  @IsString()
  @Matches(/^[가-힣]{1,10}$/, {
    message: 'Username must be 1–10 Korean characters',
  })
  username?: string;

  @ApiPropertyOptional({ example: 'secure#pass123' })
  @IsString()
  @MinLength(12)
  @MaxLength(20)
  @Matches(/^(?=.*[a-z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{12,20}$/, {
    message:
      'Password must be 12–20 characters long and include lowercase letters, numbers, and special characters',
  })
  password?: string;
}
