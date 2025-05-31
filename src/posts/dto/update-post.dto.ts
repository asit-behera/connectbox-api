import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdatePostDto {
  @ApiPropertyOptional({ example: 'Updated Title', maxLength: 30 })
  @IsOptional()
  @IsString()
  @MaxLength(30)
  title?: string;

  @ApiPropertyOptional({ example: 'Updated content.', maxLength: 1000 })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  content?: string;
}
