import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { AUTH_ERRORS } from 'src/exception/const';
import { getObjectId } from 'src/modules/common/database/mongo/shared/mongo.utils';
import { UserInfoRepository } from 'src/modules/common/database/postgres/account/repositories/user-info.repository';
import { AuthUserRepository } from 'src/modules/common/database/postgres/auth/repositories/auth-user.repository';
import { logger } from 'src/shared/logger';
import { getAccessToken, verifyEncodedPassword } from '../../shared/auth.util';
import { UserSessionService } from '../../user-session/services/user-session.service';
import { LoginResponseDto } from '../shared/login.dto';
import { ILoginWithPassword } from '../shared/login.interface';

@Injectable()
export class LoginService {
  constructor(
    private readonly authUserRepository: AuthUserRepository,
    private readonly userInfoRepository: UserInfoRepository,

    private readonly userSessionService: UserSessionService,
  ) {}

  async loginWithPassword(input: ILoginWithPassword): Promise<LoginResponseDto> {
    const userInfo = await this.userInfoRepository.getByEmail(input.email);
    if (!userInfo) throw new NotFoundException(AUTH_ERRORS.USER_NOT_EXISTED);

    const authUser = await this.authUserRepository.getByUserId(userInfo.userId);
    if (!authUser) throw new NotFoundException(AUTH_ERRORS.USER_NOT_EXISTED);
    if (!authUser.password) throw new UnauthorizedException(AUTH_ERRORS.INVALID_PASSWORD);

    const isVerified = await verifyEncodedPassword(input.password, authUser.password);
    if (!isVerified) throw new UnauthorizedException(AUTH_ERRORS.INVALID_PASSWORD);

    const sessionId = getObjectId();
    const accessToken = getAccessToken({
      id: sessionId,
      userId: userInfo.userId,
      email: userInfo.email,
    });

    this.userSessionService
      .captureLatestSession({
        _id: sessionId,
        userId: userInfo.userId,
      })
      .catch((err) =>
        logger.error(`Capture latest access token of userId=${userInfo.userId} failed`, err),
      );

    return { accessToken };
  }
}
