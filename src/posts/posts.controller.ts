import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Query,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { User } from '@prisma/client';
import { CurrentUser } from 'src/auth/currentUser.decorator';
import { ApiBearerAuth, ApiParam, ApiQuery } from '@nestjs/swagger';
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

  @ApiParam({
    name: 'id',
    required: true,
    type: Number,
    description: 'Post Id',
  })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const post = await this.postsService.findOne(+id);

    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }

    return post;
  }

  /*  @Get()
  findAll() {
    return this.postsService.findAll();
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
