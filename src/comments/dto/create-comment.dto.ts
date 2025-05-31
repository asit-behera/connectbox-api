import { IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({
    description: 'Content of the comment',
    minLength: 1,
    maxLength: 500,
    example: 'This is an insightful post!',
  })
  @IsString()
  @Length(1, 500, {
    message: 'Comment content must be between 1 and 500 characters.',
  })
  content: string;
}
