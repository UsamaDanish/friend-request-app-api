import {
  Controller,
  Post,
  Body,
  Request,
  Patch,
  Param,
  Get,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { UserRequest } from '@/modules/shared/models/request.model';
import { UserModel } from '@/modules/user/models';
import { SendFriendRequestReq } from '../models/signup.req';
import { UserFriendsService } from '../services/user-friend.service';
import { UpdateFriendRequestReq } from '../models/patch-request.req';
import { PaginatedRes } from '@/modules/shared/decorators/paginated-res.decorator';
import { PaginationRes } from '@/modules/shared/models/pagination.res';
import { UsersFriendsModel } from '../models';
import { PaginationReq } from '@/modules/shared/models/pagination.req';

@ApiTags('users-friends')
@Controller('users-friends')
export class UserFriendsController {
  constructor(private userFriendsService: UserFriendsService) {}

  @ApiBearerAuth()
  @Get()
  @PaginatedRes(UsersFriendsModel)
  getUsers(
    @Request() req: UserRequest,
    @Query() query: PaginationReq,
  ): Promise<PaginationRes<UsersFriendsModel>> {
    return this.userFriendsService.getMyFriends(
      query,
      (req.user as UserModel)._id as string,
    );
  }

  @ApiBearerAuth()
  @Post('send-request')
  addUserFriend(
    @Request() req: UserRequest,
    @Body() body: SendFriendRequestReq,
  ): Promise<string> {
    return this.userFriendsService.addUserFriend(
      (req.user as UserModel)._id as string,
      body.friendId,
    );
  }

  @ApiBearerAuth()
  @Patch('request/:requestId')
  updateRequest(
    @Request() req: UserRequest,
    @Body() body: UpdateFriendRequestReq,
    @Param('requestId') requestId: string,
  ): Promise<string> {
    return this.userFriendsService.updateFriendRequest(
      (req.user as UserModel)._id as string,
      requestId,
      body.status,
    );
  }
}
