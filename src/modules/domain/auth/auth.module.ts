import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { LoginModule } from './login/login.module';
import { UserSessionModule } from './user-session/user-session.module';
import { ValidateModule } from './validate/validate.module';

@Module({
  imports: [UserModule, LoginModule, UserSessionModule, ValidateModule],
})
export class AuthModule {}
