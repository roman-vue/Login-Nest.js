import { IsEmail, IsNotEmpty, IsSemVer, IsString } from 'class-validator';
export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  password: string;
}
