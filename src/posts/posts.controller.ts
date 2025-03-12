import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { PostsService } from './providers/posts.service';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dtos/create-post.dto';
import { PatchPostDto } from './dtos/patch-post.dto';

@Controller('posts')
@ApiTags('Posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  public findAll() {
    return this.postsService.findAll();
  }

  @ApiOperation({ summary: 'Create Blog Post Endpoint' })
  @ApiResponse({ status: 201, description: 'The post is successfully created' })
  @Post()
  public createPost(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @ApiOperation({ summary: 'Patch Blog Post Endpoint' })
  @ApiResponse({ status: 200, description: 'The post is successfully updated' })
  @Patch()
  public updatePost(@Body() patchPostDto: PatchPostDto) {
    return patchPostDto;
  }

  @ApiOperation({ summary: 'Delete Post By ID' })
  @ApiResponse({ status: 200, description: 'The post is successfully deleted' })
  @ApiParam({ name: 'id', description: 'Post ID', example: 123 })
  @Delete(':id')
  public deletePost(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return this.postsService.delete(id);
  }
}
