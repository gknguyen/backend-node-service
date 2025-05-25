import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { HttpHeader } from '../../shared/auth.const';
import { AccessTokenPayloadDto } from '../../shared/auth.dto';

export class ValidateJwtTokenRequestHeaderDto {
  @Expose()
  @IsNotEmpty()
  @IsString()
  [HttpHeader.AccessToken]: string;
}

export class ValidateJwtTokenResponseDto {
  @ApiProperty({
    type: AccessTokenPayloadDto,
  })
  payload: AccessTokenPayloadDto;
}
