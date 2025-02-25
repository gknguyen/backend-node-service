import { IUserInfo } from 'src/modules/domain/account/user/shared/user.interface';
import { EntitySchema } from 'typeorm';
import { TableName } from '../../../shared/database.const';
import { BaseSchema } from './base.schema';

export const UserInfoSchema = new EntitySchema<IUserInfo>({
  name: TableName.UserInfo,
  tableName: TableName.UserInfo,
  columns: {
    userId: {
      name: 'user_id',
      type: 'uuid',
      primary: true,
      generated: 'uuid',
      comment: 'Primary key',
    },
    email: {
      type: String,
      length: 50,
      nullable: false,
      comment: 'User email',
    },
    phone: {
      type: String,
      length: 20,
      nullable: true,
      comment: 'User phone number',
    },
    ...BaseSchema,
  },
});
