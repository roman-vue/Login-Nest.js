import { Body, Controller, Post } from '@nestjs/common';
import { UserDto } from '../user/dto/user.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  public async register(@Body() userDto: UserDto) {
    return await this.authService.register(userDto);
  }

  @Post('/login')
  public async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }
}
