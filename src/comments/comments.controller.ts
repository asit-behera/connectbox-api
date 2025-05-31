import {
  Controller,
  Post,
  Body,
  Param,
  UseGuards,
  Get,
  Query,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentsService } from './comments.service';
import { CurrentUser } from 'src/auth/decorators/currentUser.decorator';
import { User } from '@prisma/client';
import {
  ApiBearerAuth,
  ApiParam,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('posts/:postId/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  create(
    @Param('postId') postId: string,
    @Body() createCommentDto: CreateCommentDto,
    @CurrentUser() currentUser: User,
  ) {
    const userId = currentUser.id;
    return this.commentsService.create(
      createCommentDto,
      userId,
      parseInt(postId),
    );
  }

  @Get()
  @ApiQuery({ name: 'cursor', required: false, type: Number })
  async listComments(
    @Param('postId') postId: number,
    @Query('cursor') cursor?: number,
  ) {
    return this.commentsService.getComments(postId, cursor);
  }

  @Delete(':id')
  @ApiParam({ name: 'postId', type: Number })
  @ApiParam({ name: 'id', type: Number, description: 'Comment ID' })
  //TODO :: Add @ApiResponse for all apis
  @ApiResponse({ status: 200, description: 'Comment deleted successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Comment not found' })
  deleteComment(
    @Param('postId', ParseIntPipe) postId: number,
    @Param('id', ParseIntPipe) commentId: number,
    @CurrentUser() user: User,
  ) {
    return this.commentsService.remove(postId, commentId, user.id);
  }
}
