import UsersFriendsRepository from '@/dal/repositories/users-friends/uses-friends.repository';
import UserRepository from '@/dal/repositories/users/user.repository';

export const reposFactory = {
  getUserRepo: () => {
    return new UserRepository();
  },
  getUsersFriendsRepo: () => {
    return new UsersFriendsRepository();
  },
};
