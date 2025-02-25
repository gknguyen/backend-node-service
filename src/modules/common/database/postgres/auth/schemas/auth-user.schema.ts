import { TableName } from 'src/modules/common/database/shared/database.const';
import { IAuthUser } from 'src/modules/domain/auth/user/shared/user.interface';
import { EntitySchema } from 'typeorm';
import { BaseSchema } from './base.schema';

export const AuthUserSchema = new EntitySchema<IAuthUser>({
  name: TableName.AuthUser,
  tableName: TableName.AuthUser,
  columns: {
    userId: {
      name: 'user_id',
      type: 'uuid',
      primary: true,
      generated: 'uuid',
      comment: 'Primary key',
    },
    password: {
      type: String,
      length: 100,
      nullable: true,
      comment: 'Authentication Password',
    },
    ...BaseSchema,
  },
});
