import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private userServices: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getUsers(){
    return await this.userServices.getUsers()
  }
}
