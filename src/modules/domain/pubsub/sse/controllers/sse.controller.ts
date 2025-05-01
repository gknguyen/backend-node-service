import { Controller, Param, Sse } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { MessagePattern } from '@nestjs/microservices';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Observable, Subject } from 'rxjs';
import {
  EventTypeEnum,
  KafkaTopicEnum,
  RabbitPatternEnum,
} from 'src/modules/common/event/shared/event.const';
import { EventConsumer } from 'src/modules/common/event/shared/event.decorator';
import { EmitMessageDto } from 'src/modules/common/event/shared/event.dto';
import { SseService } from '../services/sse.service';
import { IMessageEvent } from '../shared/interface';

@ApiTags('Pubsub - SSE')
@Controller({ path: 'pubsub/sse' })
export class SseController {
  constructor(private readonly sseService: SseService) {}

  @Sse(':id')
  @ApiOperation({
    operationId: 'serverPushChannel',
    summary: 'SSE channel which push data to client side.',
    description: 'Received data from endpoint **emitMessage**',
  })
  sse(@Param('id') channelId: string): Observable<IMessageEvent> {
    const subject = new Subject<IMessageEvent>();

    this.sseService.addChannel(channelId, subject);

    subject.subscribe({
      complete: () => this.sseService.removeChannel(channelId),
    });

    return subject.asObservable();
  }

  @OnEvent(EventTypeEnum.Base)
  handleEvent(payload: EmitMessageDto) {
    this.sseService.pushDataToChannel(payload.id, payload.data);
  }

  @MessagePattern(RabbitPatternEnum.Base)
  handleEventFromRabbitMQ(payload: EmitMessageDto) {
    this.sseService.pushDataToChannel(payload.id, payload.data);
  }

  @EventConsumer(KafkaTopicEnum.Base)
  handleEventFromKafka(payload: EmitMessageDto) {
    this.sseService.pushDataToChannel(payload.id, payload.data);
  }
}
