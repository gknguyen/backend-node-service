import { Body, Controller, Inject, Post } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { EventTypeEnum, KAFKA_SERVICE_TOKEN, RABBITMQ_SERVICE_TOKEN } from '../shared/event.const';
import { EmitMessageDto } from '../shared/event.dto';
import { IKafkaService, IRabbitMQService } from '../shared/event.interface';

@ApiTags('Event')
@Controller({ path: 'api/event' })
export class EventApiController {
  constructor(
    private readonly eventEmitter: EventEmitter2,
    @Inject(RABBITMQ_SERVICE_TOKEN) private readonly rabbitMQService: IRabbitMQService,
    @Inject(KAFKA_SERVICE_TOKEN) private readonly kafkaService: IKafkaService,
  ) {}

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
    return 'message sent.';
  }

  @Post('rabbitmq/emit-message')
  @ApiOperation({
    operationId: 'rabbitmqEmitMessage',
    summary: 'Emit a sample message to RabbitMQ.',
  })
  @ApiBody({
    description: EmitMessageDto.name,
    type: EmitMessageDto,
  })
  async rabbitmqEmitMessage(@Body() body: EmitMessageDto) {
    await this.rabbitMQService.emitMessage(body);
    return 'message sent.';
  }

  @Post('kafka/emit-message')
  @ApiOperation({
    operationId: 'kafkaEmitMessage',
    summary: 'Emit a sample message to Kafka.',
  })
  @ApiBody({
    description: EmitMessageDto.name,
    type: EmitMessageDto,
  })
  async kafkaEmitMessage(@Body() body: EmitMessageDto) {
    await this.kafkaService.emitMessage(body);
    return 'message sent.';
  }
}
