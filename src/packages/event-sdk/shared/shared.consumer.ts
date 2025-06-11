import { Injectable } from '@nestjs/common';
import { ExternalContextCreator, MetadataScanner, ModulesContainer } from '@nestjs/core';
import { sleep } from 'src/shared/utils';
import { EVENT_SDK_CONTEXT_TYPE, RETRIABLE_ERROR_CODES } from './shared.const';
import { IContext, IRetryWithBackoffOptions } from './shared.type';
import { SharedSubscriber } from './shared.subscriber';

@Injectable()
export abstract class SharedConsumer extends SharedSubscriber {
  constructor(
    protected readonly modulesContainer: ModulesContainer,
    protected readonly metadataScanner: MetadataScanner,
    protected readonly externalContextCreator: ExternalContextCreator,
  ) {
    super(modulesContainer, metadataScanner, externalContextCreator);
  }

  protected getHandler(methodKey: string, instance: Record<string, (...args: any[]) => any>) {
    return this.externalContextCreator.create(
      instance,
      instance[methodKey],
      methodKey,
      undefined,
      undefined,
      undefined,
      undefined,
      { guards: true, interceptors: true, filters: true },
      EVENT_SDK_CONTEXT_TYPE,
    );
  }

  protected async handleRetryWithBackoff(
    { topic, partition, offset }: IContext,
    handler: (...args: any[]) => Promise<any>,
    { retries, backoffInterval, timeout, logger }: IRetryWithBackoffOptions,
  ) {
    let attempts = 0;
    const startTime = Date.now();

    while (attempts <= retries) {
      const elapsed = Date.now() - startTime;
      if (elapsed > timeout) {
        logger.error(`Retry timeout (${timeout}ms) exceeded, committing offset and skipping.`);
        await this.commitOffset({ topic, partition, offset });
        break;
      }

      try {
        await handler();
        break;
      } catch (err) {
        attempts++;
        if (!err.code || (err.code && !RETRIABLE_ERROR_CODES.includes(err.code))) {
          logger.error('Non-retriable error, committing offset and skipping', err);
          await this.commitOffset({ topic, partition, offset });
          break;
        } else if (attempts > retries) {
          logger.error('Max retries reached, committing offset and skipping');
          await this.commitOffset({ topic, partition, offset });
          break;
        } else {
          logger.warn(
            `Something wrong when processing message, retried with attempt ${attempts}`,
            err,
          );
          await sleep(backoffInterval);
        }
      }
    }
  }

  protected abstract commitOffset({ topic, partition, offset }: IContext): Promise<void>;
}
