import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class loginDto {
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string
    @IsNotEmpty()
    @IsString()
    password: string
}