import { Controller, Get } from '@nestjs/common';
import { RoomsService } from './rooms.service';

@Controller('rooms')
export class RoomsController {
  
  constructor(private roomServices: RoomsService) {}

  @Get()
  async getRooms(){
    return await this.roomServices.getRooms()
  }
}
