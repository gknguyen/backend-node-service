import { Module } from '@nestjs/common';
import { SseController } from './controllers/sse.controller';

@Module({
  imports: [],
  controllers: [SseController],
  providers: [],
})
export class SseModule {}
