import { Body, Controller, Post } from '@nestjs/common';
import { TagsService } from './providers/tags.service';
import { CreateTagDto } from './dtos/create-tag.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

/**
 * The controller for the tags
 * @class
 */
@ApiTags('Tags')
@Controller('tags')
export class TagsController {
  /**
   * The constructor for the tags controller
   * Inject [TagsService]{@link TagsService}
   * @param tagsService
   */
  constructor(
    /**
     * Inject the tags service
     */
    private readonly tagsService: TagsService,
  ) {}

  /**
   * API endpoint controller for creating a new tag
   * @param createTagDto
   */
  @ApiOperation({ summary: 'Create a new tag' })
  @ApiResponse({
    status: 201,
    description: 'The tag has been successfully created',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @Post()
  public createTag(@Body() createTagDto: CreateTagDto) {
    return this.tagsService.create(createTagDto);
  }
}
