import { Module } from '@nestjs/common';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [RoomsController],
  providers: [RoomsService, PrismaService]
})
export class RoomsModule {}
