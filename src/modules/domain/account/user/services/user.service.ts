import { Injectable } from '@nestjs/common';
import { UserInfoRepository } from 'src/modules/common/database/postgres/account/repositories/user-info.repository';
import { ICreateUserInfo, IUserInfo } from '../shared/user.interface';

@Injectable()
export class UserService {
  constructor(private readonly userInfoRepository: UserInfoRepository) {}

  registerInfo(input: ICreateUserInfo): Promise<IUserInfo> {
    return this.userInfoRepository.create(input);
  }
}
