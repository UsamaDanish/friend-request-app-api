import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { LoginResponseModel, SignupReq } from '@/modules/auth/models';
import { UserHelper } from '@/modules/user/helpers/user.helper';
import { AuthHelper } from '../helpers/auth.helper';
import { UserModel } from '@/modules/user/models';
import { AuthConstants } from '../constants';
import { UserRequest } from '@/modules/shared/models/request.model';

@Injectable()
export class AuthService {
  constructor(private userHelper: UserHelper, private authHelper: AuthHelper) {}

  async signupUser(req: SignupReq): Promise<UserModel> {
    const user = await this.userHelper.signUpUser(req.email, req.password);

    if (!user) {
      throw new InternalServerErrorException(
        AuthConstants.errorMessages.signupFailed,
      );
    }

    return user;
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<UserModel | null> {
    const user = await this.userHelper.getUser(
      { email: email.toLowerCase() },
      [],
      ['email', 'password'],
    );

    if (!user) {
      return null;
    }

    const isPasswordMatch = await this.userHelper.matchPassword(user, password);

    return isPasswordMatch ? user : null;
  }

  login(req: UserRequest): LoginResponseModel {
    return this.authHelper.login(req);
  }
}
