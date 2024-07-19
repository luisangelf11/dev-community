import { Controller, Get, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('rooms')
export class RoomsController {
  
  constructor(private roomServices: RoomsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getRooms(){
    return await this.roomServices.getRooms()
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  async getRoom(@Param('id', ParseIntPipe) id: number){
    return await this.roomServices.getRoom(id)
  }
}
