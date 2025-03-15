import { LoginService } from './services/login.service';
import { LoginController } from './controllers/login.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [LoginController],
  providers: [LoginService],
})
export class LoginModule {}
