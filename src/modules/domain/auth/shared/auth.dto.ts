import { ApiProperty } from '@nestjs/swagger';
import { IAccessTokenPayload } from './auth.interface';

export class AccessTokenPayloadDto implements IAccessTokenPayload {
  @ApiProperty({
    type: 'string',
  })
  id: string;

  @ApiProperty({
    type: 'string',
  })
  userId: string;

  @ApiProperty({
    type: 'string',
  })
  email: string;
}
