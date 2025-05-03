import { Injectable } from '@nestjs/common';
import { ExternalContextCreator, MetadataScanner, ModulesContainer } from '@nestjs/core';
import { sleep } from 'src/shared/utils';
import { EVENT_SDK_CONSUMER_METADATA, EVENT_SDK_CONTEXT_TYPE } from './shared.const';
import { IContext, IRetryWithBackoffOptions } from './shared.type';

@Injectable()
export abstract class SharedConsumer {
  protected readonly subscriberMap = new Map<
    string,
    {
      [index: string]: {
        instance: Record<string, (...args: any[]) => any>;
        methodKey: string;
      };
    }
  >();

  constructor(
    protected readonly modulesContainer: ModulesContainer,
    protected readonly metadataScanner: MetadataScanner,
    protected readonly externalContextCreator: ExternalContextCreator,
  ) {}

  protected setupSubscriberMap() {
    const modules = this.modulesContainer.values();
    for (const nestModule of Array.from(modules)) {
      nestModule.controllers.forEach((controller) => {
        const { instance } = controller;
        const instancePrototype = Object.getPrototypeOf(instance);
        const methodKeys = this.metadataScanner.getAllMethodNames(instancePrototype);

        for (const methodKey of methodKeys) {
          const targetCallback = instancePrototype[methodKey];

          const topic = this.getSubscribeMetadata(targetCallback);
          if (topic) {
            const callbackList = this.subscriberMap.get(topic) || {};
            callbackList[Object.keys(callbackList).length] = {
              instance: instance as any,
              methodKey,
            };
            this.subscriberMap.set(topic, callbackList);
          }
        }
      });
    }
  }

  private getSubscribeMetadata(callback: (...args: any[]) => any): string {
    return Reflect.getMetadata(EVENT_SDK_CONSUMER_METADATA, callback);
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
        if (attempts > retries) {
          logger.error('Max retries reached, committing offset and skipping');
          await this.commitOffset({ topic, partition, offset });
          break;
        } else {
          logger.warn(`Error when processing message, retried with attempt ${attempts}`, err);
          await sleep(backoffInterval);
        }
      }
    }
  }

  protected abstract commitOffset({ topic, partition, offset }: IContext): Promise<void>;
}
