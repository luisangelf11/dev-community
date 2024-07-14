import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateUserDto{
    @IsString()
    @MinLength(8)
    @IsNotEmpty()
    username

    @IsString()
    @IsNotEmpty()
    password

    @IsString()
    @IsNotEmpty()
    name

    @IsString()
    @IsNotEmpty()
    lastname
}