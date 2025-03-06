import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTagDto {
  @ApiProperty({
    example: 'JavaScript',
    description: 'The name of the tag',
  })
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(256)
  @IsString()
  name: string;

  @ApiProperty({
    example: 'javascript-example',
    description: 'The slug of the tag',
  })
  @IsNotEmpty()
  @MaxLength(256)
  @IsString()
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message:
      'A slug should be all small letters and uses only "-" and without spaces. For example "my-url"',
  })
  slug: string;

  @ApiPropertyOptional({
    example:
      'JavaScript is a programming language that conforms to the ECMAScript specification.',
    description: 'The description of the tag',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    example:
      '{\r\n "@context": "https:\/\/schema.org", \r\n "@type": "Person"\r\n}',
    description:
      'Serialize your JSON object else a validation error will be thrown',
  })
  @IsOptional()
  @IsString()
  schema?: string;

  @ApiPropertyOptional({
    example: 'https://kinsta.com/wp-content/uploads/2022/06/incognito-mode.jpg',
    description: 'URL format of the Image',
  })
  @IsOptional()
  @IsUrl()
  @MaxLength(1024)
  featureImageUrl?: string;
}
