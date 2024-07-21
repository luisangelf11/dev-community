import { Request, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateMessageDto } from 'src/messages/dto/create-message.dto';
import { MessagesService } from 'src/messages/messages.service';

@WebSocketGateway()
export class WebsocketGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private jwt: JwtService,
    private messageServices: MessagesService,
  ) {}

  @WebSocketServer()
  server: Server;

  async handleConnection(client: Socket) {
    const token = client.handshake.headers.authorization;
    if (!token) {
      client.disconnect();
      return;
    }
    const jwtEncode = token.split(' ')[1];
    const decoded = await this.jwt.verifyAsync(jwtEncode, {
      secret: 'SECRET_KEY',
    });
    client.data.user = decoded;
    console.log(`Client connected: ${client.id}`, client.data.user);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('message')
  async handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: CreateMessageDto,
  ) {
    client.broadcast.emit(
      'messageServer',
      `${client.data.user.username}: ${data.message}`,
    );
    await this.messageServices.createMessage(
      { message: data.message, roomId: data.roomId },
      client.data.user.sub,
    );
  }
}
