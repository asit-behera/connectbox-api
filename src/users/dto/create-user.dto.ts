import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
import { User } from '@prisma/client';

export class CreateUserDto
  implements Pick<User, 'email' | 'username' | 'password'>
{
  @ApiProperty({ example: 'john@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'john123' })
  @IsString()
  @MaxLength(10)
  username: string;

  @ApiProperty({ example: 'securePassword123' })
  @IsString()
  @MinLength(6)
  password: string;
}
