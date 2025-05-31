import { Controller, Get, Post, Body, UseGuards, Query } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { User } from '@prisma/client';
import { CurrentUser } from 'src/auth/currentUser.decorator';
import { ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  create(@CurrentUser() user: User, @Body() createPostDto: CreatePostDto) {
    return this.postsService.createPost(createPostDto, user.id);
  }

  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number for pagination (default: 1)',
  })
  @Get()
  async listPosts(@Query('page') page: number = 1) {
    const limit = 20;
    const skip = (page - 1) * limit;

    const [totalCount, posts] = await this.postsService.listPosts({
      skip,
      limit,
    });

    return {
      totalCount,
      posts,
    };
  }

  /*  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  } */
}
