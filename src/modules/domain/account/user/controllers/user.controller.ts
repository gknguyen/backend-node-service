import { Controller } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { EventTypeEnum } from 'src/modules/event/shared/event.const';
import { UserService } from '../services/user.service';
import { CreateUserInfoDto } from '../shared/user.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @OnEvent(EventTypeEnum.UserCreated)
  createUserInfo(payload: CreateUserInfoDto) {
    return this.userService.registerInfo(payload);
  }
}
