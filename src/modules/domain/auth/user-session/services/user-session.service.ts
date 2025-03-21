import { Injectable } from '@nestjs/common';
import { UserSessionRepository } from 'src/modules/common/database/mongo/auth/repositories/user-session.repository';
import { IWithMongoId } from 'src/modules/common/database/mongo/shared/mongo.interface';
import { TPartialBy } from 'src/shared/interface';
import { IUserSession } from '../shared/user-session.interface';

@Injectable()
export class UserSessionService {
  constructor(private readonly userSessionRepository: UserSessionRepository) {}

  async captureLatestSession(
    input: TPartialBy<IUserSession, 'isDeleted' | 'createdAt' | 'updatedAt'> & IWithMongoId,
  ) {
    await this.userSessionRepository.invalidateAll();

    return this.userSessionRepository.create(input);
  }
}
