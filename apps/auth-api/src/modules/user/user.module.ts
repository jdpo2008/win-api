import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RmqModule, User, AuthModule } from '@lib/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { NOTIFICATION_SERVICE } from '../../constants/services';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    RmqModule.register({
      name: NOTIFICATION_SERVICE,
    }),
    AuthModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService, RmqModule, AuthModule],
})
export class UserModule {}
