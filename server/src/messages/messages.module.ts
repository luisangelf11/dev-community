import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [MessagesService, PrismaService],
  controllers: [MessagesController]
})
export class MessagesModule {}
