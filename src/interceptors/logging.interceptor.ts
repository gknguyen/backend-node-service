import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { KafkaContext } from '@nestjs/microservices';
import { Request, Response } from 'express';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { EVENT_SDK_CONTEXT_TYPE, IKafkaJS } from 'src/packages/event-sdk';
import { logger } from 'src/shared/logger';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const contextType = context.getType<string>();
    if (contextType === 'http') {
      return this.httpLog(context, next);
    } else if (contextType === EVENT_SDK_CONTEXT_TYPE) {
      return this.kafkaLog(context, next);
    } else if (contextType === 'rpc') {
      return this.rpcLog(context, next);
    }
    return next.handle();
  }

  private httpLog(context: ExecutionContext, next: CallHandler): Observable<any> {
    const httpRequest = context.switchToHttp().getRequest<Request>();
    logger.httpRequestLog(httpRequest);

    return next.handle().pipe(
      tap({
        next: () => {
          const httpResponse = context.switchToHttp().getResponse<Response>();
          logger.httpResponseLog(httpResponse);
        },
        error: (err: Error): void => {
          logger.error('error', err);
        },
      }),
    );
  }

  private kafkaLog(context: ExecutionContext, next: CallHandler): Observable<any> {
    const [, kafkaContext] = context.getArgs<[any, IKafkaJS.IEventSdkContext]>();
    logger.kafkaRequestLog({
      topic: kafkaContext.topic,
      partition: kafkaContext.partition,
      offset: kafkaContext.offset,
    });

    return next.handle().pipe(
      tap({
        next: () => {
          logger.kafkaResponseLog({
            topic: kafkaContext.topic,
            partition: kafkaContext.partition,
            offset: kafkaContext.offset,
          });
        },
        error: (err: Error): void => {
          logger.error('error', err);
        },
      }),
    );
  }

  private rpcLog(context: ExecutionContext, next: CallHandler): Observable<any> {
    const rpcContext = context.switchToRpc().getContext();
    if (rpcContext instanceof KafkaContext)
      logger.kafkaRequestLog({
        topic: rpcContext.getTopic(),
        partition: rpcContext.getPartition(),
        offset: rpcContext.getMessage().offset,
      });

    return next.handle().pipe(
      tap({
        next: () => {
          if (rpcContext instanceof KafkaContext)
            logger.kafkaResponseLog({
              topic: rpcContext.getTopic(),
              partition: rpcContext.getPartition(),
              offset: rpcContext.getMessage().offset,
            });
        },
        error: (err: Error): void => {
          logger.error('error', err);
        },
      }),
    );
  }
}
