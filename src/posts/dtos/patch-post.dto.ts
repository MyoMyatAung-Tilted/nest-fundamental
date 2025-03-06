import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';
import { CreatePostDto } from './create-post.dto';

export class PatchPostDto extends PartialType(CreatePostDto) {
  @ApiProperty({
    example: 12345,
    description: 'The ID of the blog post to be updated',
  })
  @IsInt()
  @IsNotEmpty()
  id: number;
}
