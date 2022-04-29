import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './routes/user/user.module';
import { AuthModule } from './routes/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/login', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      retryWrites: true,
    }),
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
