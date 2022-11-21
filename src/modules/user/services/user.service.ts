import { Injectable } from '@nestjs/common';

import { UserModel } from '@/modules/user/models';
import { PaginationReq } from '@/modules/shared/models/pagination.req';
import { PaginationRes } from '@/modules/shared/models/pagination.res';
import { UserHelper } from '../helpers/user.helper';

@Injectable()
export class UserService {
  constructor(private userHelper: UserHelper) {}

  getUserById(): UserModel | null {
    return null;
  }

  async getUsers(query: PaginationReq): Promise<PaginationRes<UserModel>> {
    const selected = ['email'];
    const usersRes = await this.userHelper.getDbUsers(
      {},
      selected,
      query.recordsPerPage,
      [],
      query.sortField,
      query.sortOrder,
      query.offset,
    );
    const total = (await this.userHelper.getDbTotalUsersCount({})) ?? 0;

    return {
      res: usersRes as UserModel[],
      totalRecords: total,
    };
  }
}
