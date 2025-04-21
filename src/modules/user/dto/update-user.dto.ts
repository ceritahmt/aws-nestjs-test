import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import {
  IsOptional,
  IsString,
  IsEmail,
  IsBoolean,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'John', description: 'First name', required: false })
  name?: string;

  @IsOptional()
  @IsEmail()
  @ApiProperty({
    example: 'jhon.doe@email.com',
    description: 'E-mail',
    required: false,
  })
  email?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'jhon', description: 'Username', required: false })
  username?: string;

  @IsOptional()
  @IsString()
  @MinLength(6)
  @ApiProperty({
    example: '123456',
    description: 'Password',
    required: false,
  })
  password?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: '1234567890',
    description: 'Phone number',
    required: false,
  })
  phone?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'en',
    description: 'Language',
    required: false,
  })
  lang?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'Manager',
    description: 'Title Code',
    required: false,
  })
  titleCode?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'IT',
    description: 'Department Code',
    required: false,
  })
  departmentCode?: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    example: true,
    description: 'Active',
    default: true,
    required: false,
  })
  status?: boolean;
}
