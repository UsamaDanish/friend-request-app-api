import { Module } from '@nestjs/common';

import { UserFriendsService } from './services/user-friend.service';
import { UserFriendsHelper } from './helpers/user-friends.helper';
import { UserFriendsController } from './controllers/users-friends.controller';

@Module({
  imports: [],
  providers: [UserFriendsService, UserFriendsHelper],
  controllers: [UserFriendsController],
  exports: [],
})
export class UserFriendModule {}
