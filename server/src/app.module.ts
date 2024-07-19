import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { RoomsModule } from './rooms/rooms.module';
import { RoomsMiddleware } from './rooms/rooms.middleware';
import { RoomsService } from './rooms/rooms.service';
import { PrismaService } from './prisma.service';

@Module({
  imports: [UsersModule, AuthModule, RoomsModule],
  controllers: [],
  providers: [RoomsService, PrismaService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RoomsMiddleware).forRoutes('*');
  }
}
