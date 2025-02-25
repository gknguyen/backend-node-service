import { Inject, Injectable } from '@nestjs/common';
import { DatabaseDomain, TableName } from 'src/modules/common/database/shared/database.const';
import { IAuthUser } from 'src/modules/domain/auth/user/shared/user.interface';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class AuthUserRepository {
  private repository: Repository<IAuthUser>;

  constructor(@Inject(DatabaseDomain.Auth) private readonly dataSource: DataSource) {
    this.repository = this.dataSource.getRepository<IAuthUser>(TableName.AuthUser);
  }

  async create(user: Omit<IAuthUser, 'userId' | 'createdAt' | 'updatedAt'>): Promise<IAuthUser> {
    return this.repository.save(user);
  }

  async checkExistedByUserId(userId: string): Promise<boolean> {
    return this.repository.exists({ where: { userId } });
  }
}
