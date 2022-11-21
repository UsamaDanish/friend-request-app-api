import { FriendRequestStatuses } from '@/dal/repositories/users-friends/users-friends.model';
import { PaginationReq } from '@/modules/shared/models/pagination.req';
import { PaginationRes } from '@/modules/shared/models/pagination.res';
import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { UserFriendsHelper } from '../helpers/user-friends.helper';
import { UsersFriendsModel } from '../models';

@Injectable()
export class UserFriendsService {
  constructor(private userFriendHelper: UserFriendsHelper) {}

  async addUserFriend(userId: string, friendId: string): Promise<string> {
    const addedUserFriend = await this.userFriendHelper.addUserToFriend(
      userId,
      friendId,
    );

    if (!addedUserFriend) {
      throw new InternalServerErrorException('Request has been failed');
    }

    return addedUserFriend;
  }

  async updateFriendRequest(
    userId: string,
    applicationId: string,
    status: number,
  ): Promise<string> {
    const updatedUserFriend =
      await this.userFriendHelper.updateFriendRequestStatus(
        userId,
        applicationId,
        status,
      );

    if (!updatedUserFriend) {
      throw new InternalServerErrorException('Request has been failed');
    }

    return updatedUserFriend;
  }

  async getMyFriends(
    query: PaginationReq,
    userId: string,
  ): Promise<PaginationRes<UsersFriendsModel>> {
    const selected = ['_id'];
    const populatedFields = [
      {
        path: 'friendId',
        select: 'email',
      },
    ];
    const usersRes = await this.userFriendHelper.getDbUsers(
      { userId: userId, status: FriendRequestStatuses.ACCEPTED },
      selected,
      query.recordsPerPage,
      populatedFields,
      query.sortField,
      query.sortOrder,
      query.offset,
    );
    const total =
      (await this.userFriendHelper.getDbTotalUsersCount({
        userId: userId,
        status: FriendRequestStatuses.ACCEPTED,
      })) ?? 0;

    return {
      res: usersRes as UsersFriendsModel[],
      totalRecords: total,
    };
  }
}
