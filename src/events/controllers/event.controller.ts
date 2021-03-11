import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Controller } from '@nestjs/common';

@Controller()
@WebSocketGateway()
export class EventController {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('events')
  handleEvent(@MessageBody() data: string): Record<string, string> {
    return { status: 'ok' };
  }
}
