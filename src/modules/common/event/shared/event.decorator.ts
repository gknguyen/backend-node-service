import { applyDecorators } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { EventSdkConsumer } from 'src/packages/event-sdk';
import ENV from 'src/shared/env';

export const EventConsumer = (topic: string) => {
  return applyDecorators(
    ENV.KAFKA.IS_CUSTOM_CLIENT ? EventSdkConsumer(topic) : MessagePattern(topic),
  );
};
