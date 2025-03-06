import { Body, Controller, Post } from '@nestjs/common';
import { MetaOptionsService } from './providers/meta-options.service';
import { MetaOptionsDto } from './dtos/meta-options.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Meta Options')
@Controller('meta-options')
export class MetaOptionsController {
  constructor(private readonly metaOptionsService: MetaOptionsService) {}

  @ApiOperation({ summary: 'Get meta options' })
  @Post()
  createMetaOption(@Body() metaOptionsDto: MetaOptionsDto) {
    return this.metaOptionsService.create(metaOptionsDto);
  }
}
