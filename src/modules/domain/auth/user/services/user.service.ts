import { BadRequestException, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { omit } from 'lodash';
import { AUTH_ERRORS } from 'src/exception/const';
import { UserInfoRepository } from 'src/modules/common/database/postgres/account/repositories/user-info.repository';
import { AuthUserRepository } from 'src/modules/common/database/postgres/auth/repositories/auth-user.repository';
import { EventTypeEnum } from 'src/modules/common/event/shared/event.const';
import { encodePassword } from '../../shared/auth.util';
import { IAuthUser, IRegisterAuthUser } from '../shared/user.interface';

@Injectable()
export class UserService {
  constructor(
    private readonly authUserRepository: AuthUserRepository,
    private readonly userInfoRepository: UserInfoRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async register(input: IRegisterAuthUser): Promise<IAuthUser> {
    if (await this.userInfoRepository.checkExistedByEmail(input.email))
      throw new BadRequestException(AUTH_ERRORS.USER_EXISTED);

    const user = await this.authUserRepository.create({
      ...input,
      ...(input.password && { password: encodePassword(input.password) }),
    });

    this.eventEmitter.emit(EventTypeEnum.UserCreated, {
      userId: user.userId,
      email: input.email,
    });

    return omit(user, 'password');
  }
}
