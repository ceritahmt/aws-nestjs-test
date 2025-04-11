import { IsString,  MinLength, IsNotEmpty } from 'class-validator';

export class CreateTitleDto {
    @IsString()
    @IsNotEmpty()
    code: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    name: string;
}