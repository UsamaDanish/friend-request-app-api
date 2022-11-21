import { IsMongoId } from 'class-validator';

export abstract class SendFriendRequestReq {
  @IsMongoId()
  friendId: string;
}
