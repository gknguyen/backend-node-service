import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ILoginWithPassword } from './login.interface';

export class LoginWithPasswordRequestDto implements ILoginWithPassword {
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

export class LoginResponseDto {
  @ApiProperty({
    type: 'string',
  })
  accessToken: string;
}
