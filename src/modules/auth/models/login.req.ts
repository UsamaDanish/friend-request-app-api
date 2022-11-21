import { IsEmail, IsString, Matches, MinLength } from 'class-validator';

import { AuthConstants } from '@/modules/auth/constants';

export abstract class LoginReqModel {
  @IsEmail(undefined, {
    message: AuthConstants.errorMessages.invalidEmail,
  })
  email: string;

  @Matches(
    /(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=])(?=.{6,}).*$/g,
    {
      message: AuthConstants.errorMessages.invalidPassword,
    },
  )
  @MinLength(6)
  @IsString()
  password: string;
}
