import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from '../services/user.service';
import { AuthUserDto, RegisterAuthUserRequestDto } from '../shared/user.dto';

@ApiTags('Auth Account')
@Controller({ path: 'auth/users' })
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({
    operationId: 'registerAuthUser',
  })
  @ApiBody({
    description: RegisterAuthUserRequestDto.name,
    type: RegisterAuthUserRequestDto,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: AuthUserDto.name,
    type: AuthUserDto,
  })
  registerAuthUser(@Body() payload: RegisterAuthUserRequestDto): Promise<AuthUserDto> {
    return this.userService.register(payload);
  }
}
