import { Controller, Param, Sse } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Observable, Subject } from 'rxjs';
import { EventTypeEnum } from '../../../event/shared/event.const';
import { EmitMessageDto } from '../../../event/shared/event.dto';
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
}
