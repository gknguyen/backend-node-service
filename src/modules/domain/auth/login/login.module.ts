import { Module } from '@nestjs/common';
import { UserSessionModule } from '../user-session/user-session.module';
import { LoginApiController } from './controllers/login.api.controller';
import { LoginService } from './services/login.service';

@Module({
  imports: [UserSessionModule],
  controllers: [LoginApiController],
  providers: [LoginService],
})
export class LoginModule {}
