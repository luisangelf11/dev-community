import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateMessageDto{
    @IsString()
    @IsNotEmpty()
    message

    @IsNumber()
    roomId
}