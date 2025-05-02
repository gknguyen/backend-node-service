import { Inject, Injectable } from '@nestjs/common';
import { EVENT_SDK_PRODUCER_TOKEN, IKafka } from 'src/packages/event-sdk';
import { KafkaTopicEnum } from '../shared/event.const';
import { EmitMessageDto } from '../shared/event.dto';
import { IKafkaService } from '../shared/event.interface';

@Injectable()
export class CustomKafkaService implements IKafkaService {
  constructor(
    @Inject(EVENT_SDK_PRODUCER_TOKEN) private readonly eventSdkProducer: IKafka.IEventSdkProducer,
  ) {}

  emitMessage(payload: EmitMessageDto) {
    return this.eventSdkProducer.emit({
      topic: KafkaTopicEnum.Base,
      key: payload.id,
      data: payload,
    });
  }
}
