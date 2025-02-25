import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString } from 'class-validator';
import { ICreateUserInfo } from './user.interface';

export class CreateUserInfoDto implements ICreateUserInfo {
  @IsNotEmpty()
  @IsString()
  @Expose({ name: 'userId' })
  userId: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @Expose({ name: 'email' })
  email: string;

  @IsOptional()
  @IsString()
  @IsPhoneNumber()
  @Expose({ name: 'phone' })
  phone?: string;
}
