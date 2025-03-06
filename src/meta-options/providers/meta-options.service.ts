import { Injectable } from '@nestjs/common';
import { MetaOptionsDto } from '../dtos/meta-options.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MetaOption } from '../meta-option.entity';
import { Repository } from 'typeorm';

/**
 * Class to connect to MetaOption table and perform business operation
 */
@Injectable()
export class MetaOptionsService {
  constructor(
    /**
     * Injected MetaOption Repository
     */
    @InjectRepository(MetaOption)
    private readonly metaOptionRepository: Repository<MetaOption>,
  ) {}

  /**
   * Create a new meta option
   * @param metaOptionsDto
   */
  async create(metaOptionsDto: MetaOptionsDto) {
    const newMetaOption = this.metaOptionRepository.create(metaOptionsDto);
    return await this.metaOptionRepository.save(newMetaOption);
  }
}
