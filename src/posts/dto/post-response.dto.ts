import { ApiProperty } from '@nestjs/swagger';

export class PostResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'My First Blog Post' })
  title: string;

  @ApiProperty({ example: 'This is the content of the post.' })
  content: string;

  @ApiProperty({ example: '2024-01-01T12:00:00Z' })
  createdAt: Date;

  @ApiProperty({ example: 'uuid-of-author' })
  authorId: string;
}
