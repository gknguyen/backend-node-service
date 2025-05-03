import { BadRequestException, CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { EVENT_SDK_CONTEXT_TYPE } from './shared/shared.const';

@Injectable()
export class EventSdkGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const ctxType = context.getType<string>();
    if (ctxType !== EVENT_SDK_CONTEXT_TYPE) return true;

    const handler = context.getHandler();
    const target = context.getClass();

    const paramTypes = Reflect.getMetadata('design:paramtypes', target.prototype, handler.name);
    const dtoClass = paramTypes?.[0];

    // Skip if it's a primitive or no class found
    if (!dtoClass || [String, Number, Boolean, Object, Array].includes(dtoClass)) return true;

    const [data] = context.getArgs<[any, any]>();

    const dtoObject: any =
      typeof data === 'object'
        ? plainToInstance(dtoClass, data, { excludeExtraneousValues: true })
        : {};

    const errors = validateSync(dtoObject, { target: true, value: true });
    if (errors.length) {
      throw new BadRequestException({ errors });
    }

    return true;
  }
}
