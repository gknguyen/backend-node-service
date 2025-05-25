import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginResponseDto, LoginWithPasswordRequestDto } from '../shared/login.dto';
import { LoginService } from '../services/login.service';

@ApiTags('Auth Login')
@Controller({ path: 'api/auth/login' })
export class LoginApiController {
  constructor(private readonly loginService: LoginService) {}

  @Post('with-password')
  @ApiOperation({
    operationId: 'loginWithPassword',
  })
  @ApiBody({
    description: LoginWithPasswordRequestDto.name,
    type: LoginWithPasswordRequestDto,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: LoginResponseDto.name,
    type: LoginResponseDto,
  })
  loginWithPassword(@Body() input: LoginWithPasswordRequestDto): Promise<LoginResponseDto> {
    return this.loginService.loginWithPassword(input);
  }
}
