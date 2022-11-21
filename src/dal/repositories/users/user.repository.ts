import { UserObject } from '@/dal/repositories/users/user.model';
import { UserModel } from '@/modules/user/models';
import { BaseRepository } from '@/dal/repositories/base/base.repository';

export default class UserRepository extends BaseRepository {
  constructor() {
    const repoName = 'Users';
    super(UserObject, repoName);
  }

  /**
   * Function to check if the provided password matches the user password
   * @param {Object} [user] - user object
   * @param {String} [password] - password to match
   * @returns {Object}
   */
  async isPasswordMatch(user: any, password: string) {
    return new Promise<any>((resolve, reject) => {
      user.comparePassword(password, (err: any, isMatch: boolean) => {
        if (err) {
          return reject(err);
        }
        return resolve(isMatch);
      });
    });
  }

  /**
   * Helper function to construct user object to be saved in database
   * @param {Object} [user] - user object
   */
  constructUserObject(user: UserModel) {
    return new UserObject({
      email: user.email,
      password: user.password,
    });
  }
}
