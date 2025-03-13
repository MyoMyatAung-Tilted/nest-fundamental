import { Injectable } from '@nestjs/common';
import { CreatePostDto } from '../dtos/create-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../post.entity';
import { Repository } from 'typeorm';
import { MetaOption } from '../../meta-options/meta-option.entity';
import { UserService } from '../../users/providers/user.service';

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
  ) {}

  /**
   * Create a new post
   * @param createPostDto
   * @return Promise<Post>
   */
  public async create(createPostDto: CreatePostDto) {
    // find author
    const author = await this.userService.findOneById(createPostDto.authorId);
    // Create Post
    const post = this.postRepository.create({ ...createPostDto, author });
    // Return the post
    return await this.postRepository.save(post);
  }

  /**
   * Find all posts
   */
  public async findAll() {
    return await this.postRepository.find({
      relations: { metaOption: true, author: true },
    });
  }

  /**
   * Delete Post by ID
   * @param {number} id
   */
  public async delete(id: number) {
    await this.postRepository.delete(id);
    return { deleted: true };
  }
}
