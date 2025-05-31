import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Post } from '@prisma/client';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  createPost(data: CreatePostDto, authorId: string): Promise<Post> {
    return this.prisma.post.create({
      data: { ...data, authorId },
    });
  }

  async listPosts({ skip, limit }: { skip: number; limit: number }) {
    const totalCount = await this.prisma.post.count();

    const posts = await this.prisma.post.findMany({
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        createdAt: true,
        author: {
          select: { username: true },
        },
      },
    });

    return [totalCount, posts];
  }

  findOne(id: number) {
    return this.prisma.post.findUnique({
      where: { id },
      include: {
        author: {
          select: { username: true },
        },
      },
    });
  }

  /* findAll() {
    return `This action returns all posts`;
  }

  

  update(id: number, UpdatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  } */
}
