import {
  IsArray,
  IsEnum,
  IsInt,
  IsISO8601,
  IsJSON,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { PostType } from '../enums/post-type.enum';
import { Status } from '../enums/status.enum';
import { MetaOptionsDto } from '../../meta-options/dtos/meta-options.dto';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({
    example: 'You’ve gone Incognito',
    description: 'This is the title for the blog post.',
  })
  @IsString()
  @MinLength(4)
  @MaxLength(512)
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    enum: PostType,
    example: 'post',
    description: `The type of the blog post. Example - ${PostType.post}, ${PostType.page}, ${PostType.series} and ${PostType.story}`,
  })
  @IsEnum(PostType)
  @IsNotEmpty()
  postType: PostType;

  @ApiProperty({
    example: 'incognito-chrome-browser',
    description: 'The slug of the blog post',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(256)
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message:
      'A slug should be all small letters and uses only "-" and without spaces. For example "my-url"',
  })
  slug: string;

  @ApiProperty({
    enum: Status,
    example: 'published',
    description: `The status of the blog post. Example - ${Status.draft}, ${Status.review}, ${Status.published} and ${Status.scheduled}`,
  })
  @IsEnum(Status)
  @IsNotEmpty()
  status: Status;

  @ApiPropertyOptional({
    example:
      'Others who use this device won’t see your activity, so you can browse more privately.',
    description: 'The content of the blog post',
  })
  @IsOptional()
  @IsString()
  content?: string;

  @ApiPropertyOptional({
    example:
      '{\r\n "@context": "https:\/\/schema.org", \r\n "@type": "Person"\r\n}',
    description:
      'Serialize your JSON object else a validation error will be thrown',
  })
  @IsOptional()
  @IsJSON()
  schema?: string;

  @ApiPropertyOptional({
    example: 'https://kinsta.com/wp-content/uploads/2022/06/incognito-mode.jpg',
    description: 'URL format of the Image',
  })
  @IsOptional()
  @MaxLength(1024)
  @IsUrl()
  featureImageUrl?: string;

  @ApiPropertyOptional({
    example: '2025-02-17T04:58:47.347Z',
    description: 'Should be ISO8601 string',
  })
  @IsISO8601()
  @IsOptional()
  publishOn?: Date;

  @ApiPropertyOptional({
    example: [1, 3],
    description: 'Ids of the Tags of the post.',
  })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  tags?: number[];

  @ApiPropertyOptional({
    type: MetaOptionsDto,
    required: false,
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => MetaOptionsDto)
  metaOption?: MetaOptionsDto | null;
}
