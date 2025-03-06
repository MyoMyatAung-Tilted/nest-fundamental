import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { PostsService } from './providers/posts.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dtos/create-post.dto';
import { PatchPostDto } from './dtos/patch-post.dto';

@Controller('posts')
@ApiTags('Posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get(':userId')
  public findAll(@Param('userId') userId: string) {
    return this.postsService.findAll(userId);
  }

  @ApiOperation({ summary: 'Create Blog Post Endpoint' })
  @ApiResponse({ status: 201, description: 'The post is successfully created' })
  @Post()
  public createPost(@Body() createPostDto: CreatePostDto) {
    return createPostDto;
  }

  @ApiOperation({ summary: 'Patch Blog Post Endpoint' })
  @ApiResponse({ status: 200, description: 'The post is successfully updated' })
  @Patch()
  public updatePost(@Body() patchPostDto: PatchPostDto) {
    return patchPostDto;
  }
}
