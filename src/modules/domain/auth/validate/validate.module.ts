import { ValidateService } from './services/validate.service';
import { Module } from '@nestjs/common';
import { ValidateApiController } from './controllers/validate.api.controller';

@Module({
  controllers: [ValidateApiController],
  providers: [ValidateService],
})
export class ValidateModule {}
