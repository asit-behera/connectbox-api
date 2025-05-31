import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({ example: 'My First Blog Post', maxLength: 30 })
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  title: string;

  @ApiProperty({ example: 'This is the content of the post.', maxLength: 1000 })
  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  content: string;
}
