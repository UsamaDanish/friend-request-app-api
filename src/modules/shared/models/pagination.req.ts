import { AppConstants } from '@/modules/shared/constants';
import { Transform } from 'class-transformer';

export abstract class PaginationReq {
  @Transform(AppConstants.transformers.number('recordsPerPage'))
  recordsPerPage?: number;

  @Transform(AppConstants.transformers.number('offset'))
  offset?: number = 0;

  sortField?: string;

  @Transform(AppConstants.transformers.number('sortOrder'))
  sortOrder?: number = -1;
}
