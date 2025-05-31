import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CommentsService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateCommentDto, authorId: string, postId: number) {
    return this.prisma.comment.create({
      data: {
        content: data.content,
        authorId,
        postId,
      },
    });
  }

  async getComments(postId: number, cursor?: number) {
    const limit = 10;

    const comments = await this.prisma.comment.findMany({
      where: { postId },
      take: limit + 1,
      skip: cursor ? 1 : 0,
      ...(cursor && { cursor: { id: cursor } }),
      orderBy: { createdAt: 'desc' },
      include: {
        author: { select: { username: true } },
      },
    });

    const hasNextPage = comments.length > limit;
    const nextCursor = hasNextPage ? comments[limit - 1].id : null;

    return {
      comments: comments.slice(0, limit).map((comment) => ({
        id: comment.id,
        content: comment.content,
        username: comment.author.username,
        createdAt: comment.createdAt.toISOString(),
      })),
      nextCursor,
    };
  }

  async remove(postId: number, commentId: number, userId: string) {
    const comment = await this.prisma.comment.findFirst({
      where: {
        id: commentId,
        postId: postId,
      },
      include: { post: true },
    });

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    const isCommentOwner = comment.authorId === userId;
    const isPostOwner = comment.post.authorId === userId;

    console.log({ isCommentOwner, isPostOwner, userId });

    if (!isCommentOwner && !isPostOwner) {
      throw new ForbiddenException(
        'You do not have permission to delete this comment',
      );
    }

    await this.prisma.comment.delete({ where: { id: commentId } });

    return { message: 'Comment deleted successfully' };
  }

  /* 
  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }
*/
}
