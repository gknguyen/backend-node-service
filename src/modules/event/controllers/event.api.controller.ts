import { Body, Controller, Post } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { EventTypeEnum } from '../shared/event.const';
import { EmitMessageDto } from '../shared/event.dto';

@ApiTags('Event')
@Controller({ path: 'api/event' })
export class EventApiController {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  @Post('emit-message')
  @ApiOperation({
    operationId: 'emitMessage',
    summary: 'Emit a sample message.',
  })
  @ApiBody({
    description: EmitMessageDto.name,
    type: EmitMessageDto,
  })
  emitMessage(@Body() body: EmitMessageDto) {
    this.eventEmitter.emit(EventTypeEnum.Base, body);
  }
}
