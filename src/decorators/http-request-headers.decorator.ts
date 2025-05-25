import { BadRequestException, createParamDecorator, ExecutionContext } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { Request } from 'express';
import { traverseValidationError } from 'src/exception/exception.utils';

export const HttpRequestHeaders = createParamDecorator((_, ctx: ExecutionContext) => {
  const handler = ctx.getHandler();
  const target = ctx.getClass();

  const paramTypes = Reflect.getMetadata('design:paramtypes', target.prototype, handler.name);
  const dtoClass = paramTypes?.[0];

  /** Skip if it's a primitive or no class found */
  if (!dtoClass || [String, Number, Boolean, Object, Array].includes(dtoClass)) return {};

  /** extract headers */
  const headers = ctx.switchToHttp().getRequest<Request>().headers;

  /** Convert headers to DTO object */
  const dto: any = plainToInstance(dtoClass, headers, { excludeExtraneousValues: true });

  /** Validate */
  const errors = validateSync(dto);
  if (errors?.length) {
    const formattedErrors = traverseValidationError(errors);
    throw new BadRequestException(formattedErrors);
  }

  /** return header dto object */
  return dto;
});
