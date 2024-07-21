import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { RoomsModule } from './rooms/rooms.module';
import { RoomsMiddleware } from './rooms/rooms.middleware';
import { RoomsService } from './rooms/rooms.service';
import { PrismaService } from './prisma.service';
import { MessagesModule } from './messages/messages.module';
import { WebsocketGateway } from './websocket/websocket.gateway';
import { WebsocketModule } from './websocket/websocket.module';

@Module({
  imports: [UsersModule, AuthModule, RoomsModule, MessagesModule, WebsocketModule],
  controllers: [],
  providers: [RoomsService, PrismaService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RoomsMiddleware).forRoutes('*');
  }
}
