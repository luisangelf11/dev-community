import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { NotFoundError } from 'rxjs';
import { PrismaService } from 'src/prisma.service';
import { CreateRoomDto } from './dto/create-room.dto';

@Injectable()
export class RoomsService {
  constructor(private prisma: PrismaService) {}

  async getRooms() {
    try {
      const rooms = await this.prisma.room.findMany();
      return rooms;
    } catch (error) {
      if (error instanceof Error)
        throw new HttpException(
          `Internal server error: ${error.message}`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
    }
  }

  async getRoom(id: number) {
    try {
      const room = await this.prisma.room.findFirst({
        where: {
          id,
        },
        include: {
          messages: true,
        },
      });
      if (!room)
        throw new NotFoundException(`This room with id ${id} is not found`);
      return room;
    } catch (error) {
      if (error instanceof NotFoundException)
        throw new NotFoundException(error.message);
      if (error instanceof Error)
        throw new HttpException(
          `Internal server error: ${error.message}`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
    }
  }

  async createRoom(dataRoom: CreateRoomDto){
    try {
        const newRoom = await this.prisma.room.create({
            data:{
                room: dataRoom.room
            }
        });
        return newRoom;
    } catch (error) {
        if (error instanceof Error)
            throw new HttpException(
              `Internal server error: ${error.message}`,
              HttpStatus.INTERNAL_SERVER_ERROR,
            );
    }
  }
}
