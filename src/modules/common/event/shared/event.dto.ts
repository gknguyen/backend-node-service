import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsObject, IsString } from 'class-validator';

export class EmitMessageDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    default: '123',
  })
  id: string;

  @IsObject()
  @IsNotEmpty()
  @ApiProperty({
    type: 'object',
    default: {
      foo: 'baz',
    },
  })
  data: any;
}
