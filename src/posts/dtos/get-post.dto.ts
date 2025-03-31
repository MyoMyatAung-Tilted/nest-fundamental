import { IsDate, IsOptional } from 'class-validator';
import { PaginationQueryDto } from '../../common/pagination/dtos/pagination-query.dto';
import { IntersectionType } from '@nestjs/mapped-types';

class GetPostsBaseDto {
  @IsDate()
  @IsOptional()
  startDate?: Date;

  @IsDate()
  @IsOptional()
  endDate?: Date;
}

export class GetPostDto extends IntersectionType(
  GetPostsBaseDto,
  PaginationQueryDto,
) {}
