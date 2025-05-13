import {
  BadRequestException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { CreatePostDto } from '../dtos/create-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../post.entity';
import { Repository } from 'typeorm';
import { MetaOption } from '../../meta-options/meta-option.entity';
import { UserService } from '../../users/providers/user.service';
import { TagsService } from '../../tags/providers/tags.service';
import { PatchPostDto } from '../dtos/patch-post.dto';
import { PaginationProvider } from '../../common/pagination/providers/pagination.provider';
import { GetPostDto } from '../dtos/get-post.dto';
import { ActiveUserData } from '../../auth/interfaces/active-user-data.interface';
import { CreatePostProvider } from './create-post.provider';

/**
 * Class to connect to Post table and perform business operation
 */
@Injectable()
export class PostsService {
  /**
   * Constructor
   * @param postRepository
   * @param metaOptionsRepository
   * @param userService
   * @param tagsService
   * @param paginationProvider
   * @param createPostProvider
   * @constructor
   */
  constructor(
    /**
     * Inject Post Repository
     */
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    /**
     * Inject MetaOption Repository
     */
    @InjectRepository(MetaOption)
    private readonly metaOptionsRepository: Repository<MetaOption>,
    /**
     * Inject User Service
     */
    private readonly userService: UserService,
    /**
     * Inject Tag Service
     */
    private readonly tagsService: TagsService,

    /**
     * Inject Pagination Provider
     */
    private readonly paginationProvider: PaginationProvider,

    /**
     * Inject Create Post Provider
     */
    private readonly createPostProvider: CreatePostProvider,
  ) {}

  /**
   * Create a new post
   * @param createPostDto
   * @param user
   * @return Promise<Post>
   */
  public async create(createPostDto: CreatePostDto, user: ActiveUserData) {
    return await this.createPostProvider.create(createPostDto, user);
  }

  /**
   * Find all posts
   */
  public async findAll(postQuery: GetPostDto) {
    return await this.paginationProvider.paginateQuery(
      { limit: postQuery.limit, page: postQuery.page },
      this.postRepository,
      {
        relations: { tags: true, author: true },
      },
    );
  }

  /**
   * Delete Post by ID
   * @param {number} id
   */
  public async delete(id: number) {
    await this.postRepository.delete(id);
    return { deleted: true };
  }

  /**
   * Update Post by ID
   */
  public async update(patchPostDto: PatchPostDto) {
    let tags = undefined;
    let post = undefined;
    // Find new Tags
    try {
      tags = await this.tagsService.findMany(patchPostDto.tags);
    } catch (error) {
      console.error(error);
      throw new RequestTimeoutException(
        'Unable to process your request at the moment please try later',
        {
          description: 'Error connecting to the database',
        },
      );
    }
    /**
     * If tags were not found and need to equal number of tags
     * or throw an error
     */
    if (!tags || tags.length !== patchPostDto.tags.length) {
      throw new BadRequestException(
        'Please check your tag Ids and ensure they are correct',
      );
    }
    // Find post
    try {
      post = await this.postRepository.findOneBy({ id: patchPostDto.id });
    } catch (error) {
      console.error(error);
      throw new RequestTimeoutException(
        'Unable to process your request at the moment please try later',
        { description: 'Error connecting to the database' },
      );
    }
    if (!post) {
      throw new BadRequestException('The post does not exist');
    }
    // Update Post
    post.title = patchPostDto.title ?? post.title;
    post.content = patchPostDto.content ?? post.content;
    post.status = patchPostDto.status ?? post.status;
    post.postType = patchPostDto.postType ?? post.postType;
    post.slug = patchPostDto.slug ?? post.slug;
    post.featureImageUrl = patchPostDto.featureImageUrl ?? post.featureImageUrl;
    post.publishOn = patchPostDto.publishOn ?? post.publishOn;
    // Update Tags
    post.tags = tags;

    try {
      await this.postRepository.save(post);
    } catch (error) {
      console.error(error);
      throw new RequestTimeoutException(
        'Unable to process your request at the moment please try later',
        {
          description: 'Error connecting to the database',
        },
      );
    }
    return post;
  }
}
