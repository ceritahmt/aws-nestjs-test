import { PartialType } from '@nestjs/mapped-types';
import { CreateDepartmentDto } from './create-department.dto';
import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class UpdateDepartmentDto extends PartialType(CreateDepartmentDto) {
  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'name',
    description: 'Department name',
    required: false,
  })
  name?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'email',
    description: 'Department email',
    required: false,
  })
  email?: string;
}
