import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiHeaders, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HttpRequestHeaders } from 'src/decorators/http-request-headers.decorator';
import { HttpHeader } from '../../shared/auth.const';
import { ValidateService } from '../services/validate.service';
import {
  ValidateJwtTokenRequestHeaderDto,
  ValidateJwtTokenResponseDto,
} from '../shared/validate.dto';

@ApiTags('Auth Validate')
@Controller({ path: 'api/auth/validate' })
export class ValidateApiController {
  constructor(private readonly validateService: ValidateService) {}

  @Get('jwt-token')
  @ApiOperation({
    operationId: 'validateJwtToken',
  })
  @ApiHeaders([
    {
      name: HttpHeader.AccessToken,
      description: 'JWT token for validation',
      required: true,
    },
  ])
  @ApiResponse({
    status: HttpStatus.OK,
    description: ValidateJwtTokenResponseDto.name,
    type: ValidateJwtTokenResponseDto,
  })
  validateJwtToken(@HttpRequestHeaders() headers: ValidateJwtTokenRequestHeaderDto) {
    return this.validateService.validateJwtToken(headers[HttpHeader.AccessToken]);
  }
}
