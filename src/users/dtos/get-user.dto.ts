import { IsInt, IsNotEmpty, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';

export class GetUserParamsDto {
  @ApiProperty({
    description: 'Get user with specific id',
  })
  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  id: number;
}

export class GetUserQueryDto extends PartialType(CreateUserDto) {
  @ApiProperty({ required: false })
  @IsNumber()
  @Type(() => Number)
  limit?: number;

  @ApiProperty({ required: false })
  @IsNumber()
  @Type(() => Number)
  offset?: number;
}
