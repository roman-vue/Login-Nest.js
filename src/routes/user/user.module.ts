import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { USERS } from 'src/models/index.model';
import { UserSchema } from 'src/schemas/user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: USERS.name,
        useFactory: () => UserSchema,
      },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
