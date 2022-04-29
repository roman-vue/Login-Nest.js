import {
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IUsers } from 'src/interfaces/user.interfaces';
import { USERS } from 'src/models/index.model';
import { Model } from 'mongoose';
import { UserService } from '../user/user.service';
import { UserDto } from '../user/dto/user.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(USERS.name) private UserModel: Model<IUsers>,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  public async register(userDto: UserDto) {
    Logger.verbose('Registering');
    const create_user = await this.userService.create(userDto);
    return create_user;
  }

  public async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const findUser = await this.UserModel.findOne({ email });
    if (!findUser) {
      throw new NotFoundException('user not found');
    }
    const check = await bcrypt.compare(password, findUser.password);
    if (!check) throw new ForbiddenException('password incorrect');
    const payload = { id: findUser.id, name: findUser.name };
    const token = await this.jwtService.sign(payload);
    const data = {
      user: findUser,
      token: token,
    };
    return data;
  }
}
