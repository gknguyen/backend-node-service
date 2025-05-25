import { Module } from '@nestjs/common';
import { UserApiController } from './controllers/user.api.controller';
import { UserService } from './services/user.service';

@Module({
  controllers: [UserApiController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
