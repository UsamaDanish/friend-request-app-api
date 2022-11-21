import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthConstants } from '@/modules/auth/constants';
import { AuthService } from '@/modules/auth/services/auth.service';
import { AuthController } from '@/modules/auth/controllers/auth.controller';
import { AuthHelper } from '@/modules/auth/helpers/auth.helper';
import { UserModule } from '@/modules/user/user.module';
import { AppConstants } from '@/modules/shared/constants';
import { AppUtils } from '@/modules/shared/utils';
import { JwtStrategy, LocalStrategy } from '../user/strategies';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: AuthConstants.secret,
      signOptions: { expiresIn: AppConstants.accessTokenExpires },
    }),
    UserModule,
  ],
  providers: [AuthHelper, AuthService, AppUtils, LocalStrategy, JwtStrategy],
  exports: [AuthService, JwtModule],
  controllers: [AuthController],
})
export class AuthModule {}
