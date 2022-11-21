import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import {
  LoginReqModel,
  LoginResponseModel,
  SignupReq,
} from '@/modules/auth/models';
import { Public } from '@/modules/shared/decorators';
import { AuthService } from '../services/auth.service';
import { AppUtils } from '@/modules/shared/utils';
import { LocalAuthGuard } from '@/modules/user/guards';
import { UserRequest } from '@/modules/shared/models/request.model';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private appUtils: AppUtils,
    private readonly authService: AuthService,
  ) {}

  @Public()
  @Post('signup')
  async signup(@Body() req: SignupReq): Promise<string> {
    await this.authService.signupUser(req);

    return 'Signed up successfully.';
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(
    @Request() req: UserRequest,
    @Body() body: LoginReqModel,
  ): LoginResponseModel {
    return this.authService.login(req);
  }
}
