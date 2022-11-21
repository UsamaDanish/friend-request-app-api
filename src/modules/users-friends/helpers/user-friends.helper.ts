import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { reposFactory } from '@/dal/repositories/factory';
import { UsersFriendsModel } from '../models';
import { AppConstants } from '@/modules/shared/constants';
import { Collection } from '@/dal/repositories/base/base.model';
import { LogService } from '@/modules/logger/services';
import { FriendRequestStatuses } from '@/dal/repositories/users-friends/users-friends.model';

@Injectable()
export class UserFriendsHelper {
  private usersFriendsRepo = reposFactory.getUsersFriendsRepo();

  constructor(private logService: LogService) {}

  async addUserToFriend(
    userId: string,
    friendId: string,
  ): Promise<string | null> {
    if (userId === friendId) {
      throw new BadRequestException('You can not be your friend.');
    }

    const isAlreadyFriend = await this.usersFriendsRepo.findOne(
      { userId: userId, friendId: friendId },
      [],
      ['_id', 'status'],
    );

    if (
      isAlreadyFriend &&
      isAlreadyFriend.status === FriendRequestStatuses.ACCEPTED
    ) {
      throw new BadRequestException(
        'This user is already in your friend list.',
      );
    } else if (
      isAlreadyFriend &&
      isAlreadyFriend.status === FriendRequestStatuses.PENDING
    ) {
      throw new BadRequestException(
        'You have already sent requst to this user.',
      );
    } else if (
      isAlreadyFriend &&
      isAlreadyFriend.status === FriendRequestStatuses.REJECTED
    ) {
      return await this.usersFriendsRepo.updateOne(
        { _id: isAlreadyFriend._id },
        { status: FriendRequestStatuses.PENDING },
        {},
      );
    } else {
      try {
        const objToSave = this.usersFriendsRepo.constructUsersFriendsObject({
          userId: userId,
          friendId: friendId,
          status: FriendRequestStatuses.PENDING,
        });

        return await this.usersFriendsRepo.save(objToSave);
      } catch (error) {
        this.logService.error(error.toString());
      }
    }

    return null;
  }

  async updateFriendRequestStatus(
    userId: string,
    applicationId: string,
    status: number,
  ): Promise<string | null> {
    const isAlreadyFriend = await this.usersFriendsRepo.findOne(
      { _id: applicationId },
      [],
      ['_id', 'status', 'friendId'],
    );

    if (isAlreadyFriend && isAlreadyFriend.friendId) {
      if (userId != isAlreadyFriend.friendId.toString()) {
        throw new BadRequestException(
          'You are not authorized for this action.',
        );
      }

      if (
        isAlreadyFriend &&
        isAlreadyFriend.status === FriendRequestStatuses.ACCEPTED
      ) {
        throw new BadRequestException(
          'This user is already in your friend list.',
        );
      } else if (
        isAlreadyFriend &&
        isAlreadyFriend.status === FriendRequestStatuses.PENDING
      ) {
        const statusToUpdate = status
          ? FriendRequestStatuses.ACCEPTED
          : FriendRequestStatuses.REJECTED;

        return await this.usersFriendsRepo.updateOne(
          { _id: isAlreadyFriend._id },
          { status: statusToUpdate },
          {},
        );
      } else if (
        isAlreadyFriend &&
        isAlreadyFriend.status === FriendRequestStatuses.REJECTED
      ) {
        throw new BadRequestException(
          'You can not do nothing with rejected requests.',
        );
      }
    } else {
      throw new NotFoundException('Friend request not found.');
    }

    return null;
  }

  async getDbUsers(
    queryObj: Partial<UsersFriendsModel>,
    selected: string[],
    recordsPerPage: number = AppConstants.recordsPerPage,
    poplucatedFields: Collection[],
    sortField = 'userId.email',
    sortOrder = -1,
    offset = 0,
  ): Promise<UsersFriendsModel[] | null> {
    try {
      return await this.usersFriendsRepo.findAll(
        queryObj,
        sortField,
        sortOrder,
        recordsPerPage,
        offset,
        poplucatedFields,
        selected,
      );
    } catch (err) {
      this.logService.error(err.toString());
    }

    return null;
  }

  async getDbTotalUsersCount(
    queryObj: Partial<UsersFriendsModel>,
  ): Promise<number | null> {
    try {
      return (await this.usersFriendsRepo.getCount(queryObj)).totalRecords;
    } catch (error) {
      this.logService.error(error.toString());
    }

    return null;
  }
}
