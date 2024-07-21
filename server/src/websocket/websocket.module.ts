import { Module } from '@nestjs/common';
import { WebsocketGateway } from './websocket.gateway';
import { JwtService } from '@nestjs/jwt';
import { MessagesService } from 'src/messages/messages.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [WebsocketGateway, JwtService, MessagesService, PrismaService],
})
export class WebsocketModule {}
