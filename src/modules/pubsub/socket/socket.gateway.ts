import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { logger } from 'src/shared/logger';

@WebSocketGateway({ cors: true })
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  handleConnection(client: Socket) {
    logger.info(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    logger.info(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('events')
  handleEvent(client: Socket, data: any): void {
    this.server.emit('events', {
      name: 'GK',
      msg: data.msg,
      currentDate: new Date().toLocaleString(),
    });
  }
}
