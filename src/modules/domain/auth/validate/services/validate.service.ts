import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AUTH_ERRORS } from 'src/exception/exception.const';
import { UserSessionRepository } from 'src/modules/common/database/mongo/auth/repositories/user-session.repository';
import { decodeAccessToken } from '../../shared/auth.util';

@Injectable()
export class ValidateService {
  constructor(private readonly userSessionRepository: UserSessionRepository) {}

  async validateJwtToken(jwtToken: string) {
    if (!jwtToken) throw new UnauthorizedException(AUTH_ERRORS.ACCESS_TOKEN_NOT_FOUND);

    const { payload, metadata } = decodeAccessToken(jwtToken);
    if (!payload || !metadata) throw new UnauthorizedException(AUTH_ERRORS.INVALID_ACCESS_TOKEN);

    /** check token TTL */
    if (!metadata.exp) throw new UnauthorizedException(AUTH_ERRORS.INVALID_ACCESS_TOKEN);
    const TTL = Math.round(new Date().getTime() / 1000);
    if (metadata.exp < TTL) throw new UnauthorizedException(AUTH_ERRORS.ACCESS_TOKEN_EXPIRED);

    /** check valid of payload */
    const { userId } = payload;
    if (!userId || (userId && !(await this.userSessionRepository.checkExistedByUserId(userId))))
      throw new UnauthorizedException(AUTH_ERRORS.USER_NOT_EXISTED);

    return { payload };
  }
}
