import { Module } from '@nestjs/common';
import { SseModule } from './sse/sse.module';
import { SocketModule } from './socket/socket.module';

@Module({
  imports: [SseModule, SocketModule],
})
export class PubsubModule {}
