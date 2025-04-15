import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, IsNotEmpty } from 'class-validator';

export class CreateTitleDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'code',
    description: 'Title code',
    required: true,
  })
  code: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @ApiProperty({
    example: 'name',
    description: 'Title name',
    required: true,
  })
  name: string;
}
