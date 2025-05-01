import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsObject, IsString } from 'class-validator';

export class EmitMessageDto {
  @IsString()
  @IsNotEmpty()
  @Expose({ name: 'id' })
  @ApiProperty({
    type: 'string',
    default: '123',
  })
  id: string;

  @IsObject()
  @IsNotEmpty()
  @Expose({ name: 'data' })
  @ApiProperty({
    type: 'object',
    default: {
      foo: 'baz',
    },
  })
  data: any;
}
