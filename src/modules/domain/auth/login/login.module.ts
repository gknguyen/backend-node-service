import { Module } from '@nestjs/common';
import { UserSessionModule } from '../user-session/user-session.module';
import { LoginController } from './controllers/login.controller';
import { LoginService } from './services/login.service';

@Module({
  imports: [UserSessionModule],
  controllers: [LoginController],
  providers: [LoginService],
})
export class LoginModule {}
