import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { CreatePostDto } from '../dtos/create-post.dto';
import { UserService } from '../../users/providers/user.service';
import { TagsService } from '../../tags/providers/tags.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../post.entity';
import { Repository } from 'typeorm';
import { ActiveUserData } from '../../auth/interfaces/active-user-data.interface';

@Injectable()
export class CreatePostProvider {
  constructor(
    /**
     * Inject Post Repository
     */
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    /**
     * Inject User Service
     */
    private readonly userService: UserService,
    /**
     * Inject Tag Service
     */
    private readonly tagsService: TagsService,
  ) {}
  /**
   * Create a new post
   * @param createPostDto
   * @param user
   * @return Promise<Post>
   */
  public async create(createPostDto: CreatePostDto, user: ActiveUserData) {
    let author = undefined;
    let tags = [];
    try {
      // Find author
      author = await this.userService.findOneById(user.sub);
      // Find tags
      tags = await this.tagsService.findMany(createPostDto.tags);
    } catch (err) {
      throw new ConflictException(err);
    }
    // Check if author is not found or tags' length is not equal to createPostDto.tags' length
    if (!author) {
      throw new BadRequestException('Author not found');
    }
    if (tags.length !== createPostDto.tags.length) {
      throw new BadRequestException('Please check your tags.');
    }
    // Create Post
    const post = this.postRepository.create({ ...createPostDto, tags, author });
    try {
      // Return the post
      return await this.postRepository.save(post);
    } catch (e) {
      throw new ConflictException(e, {
        description: 'Ensure post slug is unique and not a duplicate',
      });
    }
  }
}
