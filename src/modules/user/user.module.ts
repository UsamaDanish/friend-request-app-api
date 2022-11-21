import { Module } from '@nestjs/common';

import { UserService } from '@/modules/user/services';
import { UserController } from '@/modules/user/controllers';
import { UserHelper } from '@/modules/user/helpers/user.helper';

@Module({
  imports: [],
  providers: [UserService, UserHelper],
  controllers: [UserController],
  exports: [UserService, UserHelper],
})
export class UserModule {}
