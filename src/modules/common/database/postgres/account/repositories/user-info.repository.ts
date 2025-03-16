import { Inject, Injectable } from '@nestjs/common';
import {
  POSTGRES_ACCOUNT_TOKEN,
  TableName,
} from 'src/modules/common/database/shared/database.const';
import { IUserInfo } from 'src/modules/domain/account/user/shared/user.interface';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class UserInfoRepository {
  private repository: Repository<IUserInfo>;

  constructor(@Inject(POSTGRES_ACCOUNT_TOKEN) private readonly dataSource: DataSource) {
    this.repository = this.dataSource.getRepository<IUserInfo>(TableName.UserInfo);
  }

  async create(user: Omit<IUserInfo, 'userId' | 'createdAt' | 'updatedAt'>): Promise<IUserInfo> {
    return this.repository.save(user);
  }

  async checkExistedByEmail(email: string): Promise<boolean> {
    return this.repository.exists({ where: { email } });
  }

  async getByEmail(email: string): Promise<IUserInfo | null> {
    return this.repository.findOne({ where: { email } });
  }
}
