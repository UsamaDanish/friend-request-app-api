import { IsEmail, IsString, Matches } from 'class-validator';

import { AuthConstants } from '@/modules/auth/constants';

export abstract class SignupReq {
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
  @IsString()
  password: string;
}
