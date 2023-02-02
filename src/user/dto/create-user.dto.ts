import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";
export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    userName: string
    @IsEmail()
    @IsNotEmpty()
    email: string
    @IsString()
    @IsNotEmpty()
    password: string
    @IsString()
    @IsOptional()
    refreshToken: string
}

