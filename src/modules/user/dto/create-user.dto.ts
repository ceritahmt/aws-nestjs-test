import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsOptional,
  IsBoolean,
  MinLength,
  IsNotEmpty,
  IsAlphanumeric,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @ApiProperty({ example: 'John', description: 'First name', required: true })
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    example: 'jhon.doe@email.com',
    description: 'E-mail',
    required: true,
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @IsAlphanumeric()
  @ApiProperty({ example: 'jhon123', description: 'Username', required: true })
  username: string;

  @IsString()
  @MinLength(6)
  @ApiProperty({ example: '123456', description: 'Password', required: true })
  password: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: '123456789', description: 'Phone', required: false })
  phone?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'en', description: 'Language', required: false })
  lang?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Manager',
    description: 'Title Code',
    required: true,
  })
  titleCode: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'IT',
    description: 'Department Code',
    required: true,
  })
  departmentCode: string;

  @IsString()
  @MinLength(3)
  @IsOptional()
  @ApiProperty({
    example: 'JOHNDOE',
    description: 'For third-party app integration',
    required: false,
  })
  code: string;

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
