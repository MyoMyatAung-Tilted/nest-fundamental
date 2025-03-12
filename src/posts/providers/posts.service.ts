import { Injectable } from '@nestjs/common';
import { CreatePostDto } from '../dtos/create-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../post.entity';
import { Repository } from 'typeorm';
import { MetaOption } from '../../meta-options/meta-option.entity';

/**
 * Class to connect to Post table and perform business operation
 */
@Injectable()
export class PostsService {
  /**
   * Constructor
   * @param postRepository
   * @param metaOptionsRepository
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
  ) {}

  /**
   * Create a new post
   * @param createPostDto
   * @return Promise<Post>
   */
  public async create(createPostDto: CreatePostDto) {
    // Create Post
    const post = this.postRepository.create(createPostDto);
    // Return the post
    return await this.postRepository.save(post);
  }

  /**
   * Find all posts
   */
  public async findAll() {
    return await this.postRepository.find({ relations: { metaOption: true } });
  }

  /**
   * Delete Post by ID
   * @param {number} id
   */
  public async delete(id: number) {
    const post = await this.postRepository.findOneBy({ id });
    await this.postRepository.delete(id);
    await this.metaOptionsRepository.delete(post.metaOption.id);
    return { deleted: true };
  }
}
