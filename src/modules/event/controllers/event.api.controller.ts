import { Body, Controller, Inject, Post } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ClientKafka, ClientRMQ } from '@nestjs/microservices';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { EventTypeEnum, KafkaTopicEnum, RabbitPatternEnum } from '../shared/event.const';
import { EmitMessageDto } from '../shared/event.dto';
import { KAFKA_TOKEN, RABBITMQ_TOKEN } from '../shared/event.provider';

@ApiTags('Event')
@Controller({ path: 'api/event' })
export class EventApiController {
  constructor(
    private readonly eventEmitter: EventEmitter2,
    @Inject(RABBITMQ_TOKEN) private readonly rabbitmqClient: ClientRMQ,
    @Inject(KAFKA_TOKEN) private readonly kafkaClient: ClientKafka,
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
  rabbitmqEmitMessage(@Body() body: EmitMessageDto) {
    this.rabbitmqClient.emit(RabbitPatternEnum.Base, body);
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
  kafkaEmitMessage(@Body() body: EmitMessageDto) {
    this.kafkaClient.emit(KafkaTopicEnum.Base, body);
    return 'message sent.';
  }
}
