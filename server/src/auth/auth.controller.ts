import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authServices: AuthService,
    private userServices: UsersService,
  ) {}

  @Post('/register')
  async register(@Body() data: CreateUserDto){
    return await this.userServices.createUser(data)
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  async profile(@Request() req){
    return await this.userServices.profile(req.user.id)
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req){
    return  this.authServices.login(req.user)
  }
}
