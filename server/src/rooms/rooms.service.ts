import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class RoomsService {
    constructor(private prisma: PrismaService){}

    async getRooms(){
        try {
            const rooms = await this.prisma.room.findMany()
            return rooms;
        } catch (error) {
            if(error instanceof Error)
                throw new HttpException(`Internal server error: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
