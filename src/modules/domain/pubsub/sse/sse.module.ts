import { Module } from '@nestjs/common';
import { SseController } from './controllers/sse.controller';
import { SseService } from './services/sse.service';

/** https://docs.nestjs.com/techniques/server-sent-events */
@Module({
  controllers: [SseController],
  providers: [SseService],
})
export class SseModule {}
