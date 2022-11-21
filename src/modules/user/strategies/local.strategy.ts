import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { isEmail } from 'class-validator';

import { AppUtils } from '@/modules/shared/utils';
import { AuthService } from '@/modules/auth/services/auth.service';
import { AuthConstants } from '@/modules/auth/constants';
import { AppConstants } from '@/modules/shared/constants';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService, private appUtils: AppUtils) {
    super({ usernameField: 'email' });
  }

  /**
   * @throws BadRequestException
   */
  private checkPasswordValidity(password: string): void {
    if (!password) {
      throw new BadRequestException(
        AppConstants.errorMessages.fieldRequired('password'),
      );
    }

    if (
      !(
        password.length >= 6 &&
        /(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=])(?=.{6,}).*$/g.test(
          password,
        )
      )
    ) {
      throw new BadRequestException(
        AuthConstants.errorMessages.invalidPassword,
      );
    }
  }

  /**
   * @throws BadRequestException
   */
  private checkEmailValidity(email: string): void {
    if (!email) {
      throw new BadRequestException(
        AppConstants.errorMessages.fieldRequired('email'),
      );
    }

    if (!isEmail(email)) {
      throw new BadRequestException(AuthConstants.errorMessages.invalidEmail);
    }
  }

  async validate(email: string, password: string): Promise<any> {
    this.checkEmailValidity(email);
    this.checkPasswordValidity(password);

    const user = await this.authService.validateUser(email, password);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
