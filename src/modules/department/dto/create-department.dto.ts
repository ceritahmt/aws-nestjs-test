import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateDepartmentDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'code',
    description: 'Department code',
    required: true,
  })
  code: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @ApiProperty({
    example: 'name',
    description: 'Department name',
    required: true,
  })
  name: string;

  @IsEmail()
  @IsOptional()
  @ApiProperty({
    example: 'email',
    description: 'Department email',
    required: false,
  })
  email: string;
}
