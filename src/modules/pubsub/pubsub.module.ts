import { Module } from '@nestjs/common';
import { SseModule } from './sse/sse.module';

@Module({
  imports: [SseModule],
  controllers: [],
  providers: [],
})
export class PubsubModule {}
