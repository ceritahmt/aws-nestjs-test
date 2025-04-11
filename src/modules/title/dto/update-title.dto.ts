import { PartialType } from '@nestjs/mapped-types';
import { CreateTitleDto } from './create-title.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateTitleDto extends PartialType(CreateTitleDto) {
    @IsOptional()
    @IsString()
    name?: string;
}
