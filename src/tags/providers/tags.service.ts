import { Injectable } from '@nestjs/common';
import { CreateTagDto } from '../dtos/create-tag.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from '../tag.entity';
import { In, Repository } from 'typeorm';

/**
 * The service for the tags
 * @class
 */
@Injectable()
export class TagsService {
  /**
   * The constructor for the tags service
   * @param tagRepository
   * @constructor
   */
  constructor(
    /**
     * Inject the tag repository
     * @private
     * @var
     */
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}
  /**
   * Create a new Tag
   * @func
   * @param {CreateTagDto} createTagTdo
   */
  public async create(createTagTdo: CreateTagDto) {
    const newTag = this.tagRepository.create(createTagTdo);
    return await this.tagRepository.save(newTag);
  }
  /**
   * find many tags
   */
  public async findMany(tags: number[]) {
    return await this.tagRepository.find({ where: { id: In(tags) } });
  }

  /**
   * Delete a tag
   * @param tag
   */
  public async delete(tag: number) {
    await this.tagRepository.delete(tag);
    return { deleted: true, tag };
  }

  /**
   * Soft delete a tag
   * @param tag
   */
  public async softDelete(tag: number) {
    await this.tagRepository.softDelete(tag);
    return { deleted: true, tag };
  }
}
