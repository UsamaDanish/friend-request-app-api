import { UserFriendObject } from '@/dal/repositories/users-friends/users-friends.model';
import { BaseRepository } from '@/dal/repositories/base/base.repository';
import { UsersFriendsModel } from '@/modules/users-friends/models';

export default class UsersFriendsRepository extends BaseRepository {
  constructor() {
    const repoName = 'Users Friends';
    super(UserFriendObject, repoName);
  }

  /**
   * Helper function to construct user friend object to be saved in database
   * @param {Object} [userfriend] - user friend object
   */
  constructUsersFriendsObject(userfriend: UsersFriendsModel) {
    return new UserFriendObject({
      userId: userfriend.userId,
      friendId: userfriend.friendId,
    });
  }
}
