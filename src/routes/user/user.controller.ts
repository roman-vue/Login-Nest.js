import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth-guard';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/create')
  public async create(@Body() userDto: UserDto) {
    return await this.userService.create(userDto);
  }
  @UseGuards(JwtAuthGuard)
  @Get('/findUser')
  public async findUser() {
    return await this.userService.findUser();
  }
}
