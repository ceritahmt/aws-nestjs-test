import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class CreateDepartmentDto {
    @IsString()
    @IsNotEmpty()
    code: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    name: string;

    @IsEmail()
    @IsOptional()
    email: string;
}
