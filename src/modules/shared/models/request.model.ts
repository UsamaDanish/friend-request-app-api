import { Request } from 'express';

import { UserModel } from '@/modules/user/models';

export interface UserRequest extends Request {
  user: UserModel;
  reqId: string;
}
