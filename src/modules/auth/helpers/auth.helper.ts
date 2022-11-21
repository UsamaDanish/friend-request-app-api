import { AppConstants } from '@/modules/shared/constants';
import { UserRequest } from '@/modules/shared/models/request.model';
import { AppUtils } from '@/modules/shared/utils';
import { UserModel } from '@/modules/user/models';
import { Injectable } from '@nestjs/common';
import { LoginResponseModel } from '../models';

@Injectable()
export class AuthHelper {
  constructor(private appUtils: AppUtils) {}

  login(req: UserRequest): LoginResponseModel {
    const plainObj = (req.user as any).toObject() as UserModel;
    const tokenObj = {
      _id: plainObj._id,
    };
    const loginResponse: LoginResponseModel = {
      access_token: this.appUtils.generateJwt(
        tokenObj,
        AppConstants.accessTokenExpires,
      ),
    };

    return loginResponse;
  }
}
