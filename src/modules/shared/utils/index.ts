import { Global, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserModel } from '@/modules/user/models';
import { AppConstants } from '@/modules/shared/constants';

@Global()
@Injectable()
export class AppUtils {
  constructor(private jwtService: JwtService) {}

  generateJwt<T extends Partial<UserModel>>(
    payload: T,
    expiresIn = AppConstants.accessTokenExpires,
  ): string {
    return this.jwtService.sign(payload as any, {
      expiresIn,
    });
  }

  decodeJwt<T>(jwt: string): T {
    return this.jwtService.decode(jwt) as T;
  }

  isMongoId(id: string): boolean {
    return !!id.match(/^[0-9a-fA-F]{24}$/);
  }

  regexForCaseInsensitiveSearch(text: string): RegExp {
    return new RegExp(['^', text, '$'].join(''), 'i');
  }
}
