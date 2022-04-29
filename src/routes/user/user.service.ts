import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IUsers } from 'src/interfaces/user.interfaces';
import { USERS } from 'src/models/index.model';
import { UserDto } from './dto/user.dto';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(USERS.name) private secuenciesModel: Model<IUsers>,
  ) {}

  public async create(userDto: UserDto) {
    userDto.password = await this.generateHash(userDto.password);
    const newUser = new this.secuenciesModel(userDto);
    Logger.log('created user');
    return newUser.save();
  }

  public async findUser() {
    return await this.secuenciesModel.find();
  }

  private async generateHash(password: string): Promise<any> {
    return await bcrypt.hash(password, 10);
  }
}
