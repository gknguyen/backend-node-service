import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { EventApiController } from './controllers/event.api.controller';

/** https://docs.nestjs.com/techniques/events */
@Module({
  imports: [EventEmitterModule.forRoot()],
  controllers: [EventApiController],
})
export class EventModule {}
