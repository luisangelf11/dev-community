import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('messages')
export class MessagesController {
  constructor(private messagesServices: MessagesService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getMessages() {
    return await this.messagesServices.getMessages();
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  async getMessage(@Param('id', ParseIntPipe) id: number) {
    return await this.messagesServices.getMessage(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createMessage(@Body() data: CreateMessageDto, @Request() req) {
    return await this.messagesServices.createMessage(data, req.user.id);
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  async deleteMessage(@Param('id', ParseIntPipe) id: number) {
    return await this.messagesServices.deleteMessage(id);
  }
}
