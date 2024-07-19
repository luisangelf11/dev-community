import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { RoomsService } from './rooms.service';

@Controller('rooms')
export class RoomsController {
  
  constructor(private roomServices: RoomsService) {}

  @Get()
  async getRooms(){
    return await this.roomServices.getRooms()
  }

  @Get('/:id')
  async getRoom(@Param('id', ParseIntPipe) id: number){
    return await this.roomServices.getRoom(id)
  }
}
