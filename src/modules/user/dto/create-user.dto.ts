import {
  IsString,
  IsEmail,
  IsOptional,
  IsBoolean,
  IsNumber,
  MinLength,
  IsNotEmpty,
  IsAlphanumeric,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @IsAlphanumeric()
  username: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  lang?: string;

  @IsString()
  @IsNotEmpty()
  titleCode: string;

  @IsString()
  @IsNotEmpty()
  departmentCode: string;

  @IsString()
  @IsOptional()
  cardId?: string;

  @IsString()
  @IsOptional()
  image?: string;

  @IsBoolean()
  @IsOptional()
  mainpage?: boolean;

  @IsBoolean()
  @IsOptional()
  sidebar?: boolean;

  @IsNumber()
  @IsOptional()
  listType?: number;

  @IsString()
  code: string;

  @IsBoolean()
  @IsOptional()
  status?: boolean;

  @IsBoolean()
  @IsOptional()
  headworker?: boolean;

  @IsString()
  @IsOptional()
  pin?: string;
}
