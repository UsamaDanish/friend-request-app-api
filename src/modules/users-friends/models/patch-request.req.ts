import { Transform } from 'class-transformer';
import { Max, Min } from 'class-validator';

import { AppConstants } from '@/modules/shared/constants';

export abstract class UpdateFriendRequestReq {
  @Transform(AppConstants.transformers.number('status'))
  @Min(0)
  @Max(1)
  status: number;
}
