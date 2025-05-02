import { Injectable } from '@nestjs/common';
import { ExternalContextCreator, MetadataScanner, ModulesContainer } from '@nestjs/core';
import { EVENT_SDK_CONSUMER_METADATA, EVENT_SDK_CONTEXT_TYPE } from './shared.const';

@Injectable()
export class SharedConsumer {
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
}
