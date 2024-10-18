import { Controller, Param, Sse } from '@nestjs/common';
import { interval, map, Observable } from 'rxjs';
import { IMessageEvent } from '../shared/interface';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Pubsub - SSE')
@Controller({ path: 'pubsub/sse' })
export class SseController {
  @Sse(':id')
  @ApiOperation({
    operationId: 'serverPushChannel',
    summary: 'SSE channel which push data to client side.',
  })
  sse(@Param('id') id: string): Observable<IMessageEvent> {
    return interval(1000).pipe(map(() => ({ data: { hello: 'world', from: id } })));
  }
}
