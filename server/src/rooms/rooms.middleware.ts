import { Injectable, NestMiddleware } from '@nestjs/common';
import {Request, Response, NextFunction} from 'express';
import { RoomsService } from './rooms.service';


@Injectable()
export class RoomsMiddleware implements NestMiddleware {
  constructor(private servicesRoom: RoomsService) {
    
  }
  async use(req: Request, res: Response, next: NextFunction) {
    //List of rooms for chat
    const listRooms = ["general", "javascript", "C sharp", "java", "kotlin", "dart", "typescript", "swift", "HTML", "CSS", "PHP"]
    //Get all rooms
    const rooms =  await this.servicesRoom.getRooms()
    //Validation if the listDB is empty
    if(!rooms.length){
      listRooms.forEach(async(el)=>{
        await this.servicesRoom.createRoom({room: el})
      })
    }
    next();
  }
}
