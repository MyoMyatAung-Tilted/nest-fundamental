import { IsJSON, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class MetaOptionsDto {
  @ApiProperty({
    example:
      '{\r\n "@context": "https:\/\/schema.org", \r\n "@type": "Person"\r\n}',
    description:
      'Serialize your JSON object else a validation error will be thrown',
  })
  @IsNotEmpty()
  @IsJSON()
  metaValue: string;
}
