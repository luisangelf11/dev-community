import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class MessagesService {
    constructor(private prisma: PrismaService){}
    async getMessages(){
        try {
            const messages = await this.prisma.message.findMany();
            return messages;
        } catch (error) {
            if(error instanceof Error)
                throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async getMessage(id:number){
        try{
            const message = await this.prisma.message.findFirst({
                where:{
                    id
                },
                include:{
                    room: true
                }
            })
            if(!message) throw new NotFoundException(`The message with id ${id} is not found`)
            return message;
        }
        catch(error){
            if(error instanceof NotFoundException)
                throw new NotFoundException(error.message)
            if(error instanceof Error)
                throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async createMessage(dataMessage: CreateMessageDto, userId: number){
        try {
            const newMessage = await this.prisma.message.create({
                data:{
                    message: dataMessage.message,
                    roomId: dataMessage.roomId,
                    userId
                }
            })
            return newMessage;
        } catch (error) {
            if(error instanceof Error)
                throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async deleteMessage(id: number){
        try{
            const messageDeleted = await this.prisma.message.delete({
                where:{
                    id
                }
            })
            if(!messageDeleted) throw new NotFoundException(`The message with id ${id} is not found`)
            return messageDeleted;
        }
        catch(error){
            if(error instanceof NotFoundException)
                throw new NotFoundException(error.message)
            if(error instanceof Error)
                throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
