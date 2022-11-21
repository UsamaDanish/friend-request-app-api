import { UserModel } from '@/modules/user/models';

export class UsersFriendsModel {
  _id?: string;
  userId: string | UserModel;
  friendId: string | UserModel;
  status: string;
}
