import mongoose from 'mongoose';

const { Schema } = mongoose;

export enum FriendRequestStatuses {
  PENDING = 'pending',
  REJECTED = 'rejected',
  ACCEPTED = 'accepted',
}

const UserFriendsSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    friendId: { type: Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, default: FriendRequestStatuses.PENDING },
  },
  { timestamps: true },
);

export const UserFriendObject = mongoose.model(
  'UserFriends',
  UserFriendsSchema,
);
