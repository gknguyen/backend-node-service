import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { IAuthUser, IRegisterAuthUser } from './user.interface';

export class AuthUserDto implements IAuthUser {
  @ApiProperty({
    type: 'string',
  })
  userId: string;

  @ApiProperty({
    type: 'string',
  })
  createdAt: string | Date;

  @ApiProperty({
    type: 'string',
  })
  updatedAt: string | Date;
}

export class RegisterAuthUserRequestDto implements IRegisterAuthUser {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @ApiProperty({
    type: 'string',
    default: 'user@gmail.com',
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: 'string',
    default: '12345678',
  })
  password: string;
}
