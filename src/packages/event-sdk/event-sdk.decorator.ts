import { applyDecorators, SetMetadata } from '@nestjs/common';
import { EVENT_SDK_CONSUMER_METADATA } from './event-sdk.const';

export const EventSdkConsumer = (topic: string) => {
  return applyDecorators(SetMetadata(EVENT_SDK_CONSUMER_METADATA, topic));
};
