import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { IUser } from 'src/users/entities/user';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async validateUser(username: string, password: string): Promise<IUser>{
    try {
        const user = await this.prisma.user.findFirst({
            where:{
                username
            }
        })

        const match = await bcrypt.compare(password, user.password)
        if(user && match){
            const {password, ...result} = user;
            return result
        }
        return null

    } catch (error) {
        return null
    }
  }

  async login(user: {username: string, id: number}){
    const payload = {username: user.username, sub: user.id}
    return{
        access_token:  this.jwtService.sign(payload)
    }
  }
}
