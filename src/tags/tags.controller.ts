import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { TagsService } from './providers/tags.service';
import { CreateTagDto } from './dtos/create-tag.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

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

  /**
   * API endpoint controller for deleting a tag
   * @param id
   */
  @ApiOperation({ summary: 'Delete a tag' })
  @ApiResponse({
    status: 200,
    description: 'The tag has been successfully deleted',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiParam({ name: 'id', description: 'The id of the tag', example: 3 })
  @Delete(':id')
  public deleteTag(@Param('id', ParseIntPipe) id: number) {
    return this.tagsService.delete(id);
  }

  /**
   * API endpoint controller for soft deleting a tag
   * @param id
   */
  @ApiOperation({ summary: 'Soft Delete a Tag' })
  @ApiResponse({
    status: 200,
    description: 'The tag has been successfully soft-deleted',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiParam({ name: 'id', description: 'The id of the tag', example: 3 })
  @Delete('soft-delete/:id')
  public softDeleteTag(@Param('id', ParseIntPipe) id: number) {
    return this.tagsService.softDelete(id);
  }
}
