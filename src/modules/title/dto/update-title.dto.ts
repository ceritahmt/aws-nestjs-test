import { PartialType } from '@nestjs/mapped-types';
import { CreateTitleDto } from './create-title.dto';
import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTitleDto extends PartialType(CreateTitleDto) {
  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'name',
    description: 'Title name',
    required: false,
  })
  name?: string;
}
