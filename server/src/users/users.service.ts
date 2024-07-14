import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt' 

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getUsers() {
    try {
      const users = await this.prisma.user.findMany();
      return users;
    } catch (error) {
      if (error instanceof Error)
        throw new HttpException(
          `Internal server error: ${error.message}`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
    }
  }

  async createUser(user: CreateUserDto){
    try {
        const salOrRounds = 10;
        const hash = await bcrypt.hash(user.password, salOrRounds)
        const newUser = await this.prisma.user.create({
            data: {
                username: user.username,
                lastname: user.lastname,
                password: hash,
                name: user.name
            }
        })
        return newUser;
    } catch (error) {
        if (error instanceof Error)
            throw new HttpException(
              `Internal server error: ${error.message}`,
              HttpStatus.INTERNAL_SERVER_ERROR,
            );
    }
  }

  async profile(id: number) {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          id,
        },
      });
      if (!user)
        throw new NotFoundException(`The profile with id ${id} is not found`);
      const { password, ...result } = user;
      return result;
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
}
