import { Injectable } from '@nestjs/common';

import { UserModel } from '@/modules/user/models';
import { reposFactory } from '@/dal/repositories/factory';
import { MongoQueryModel } from '@/dal/repositories/base/base.model';
import { AppConstants } from '@/modules/shared/constants';
import { LogService } from '@/modules/logger/services';

@Injectable()
export class UserHelper {
  private usersRepo = reposFactory.getUserRepo();

  constructor(private logService: LogService) {}

  async signUpUser(email: string, password: string): Promise<UserModel | null> {
    try {
      const objToSave = this.usersRepo.constructUserObject({
        email: email.toLowerCase(),
        password,
      });

      return await this.usersRepo.save(objToSave);
    } catch (error) {
      this.logService.error(error.toString());
    }

    return null;
  }

  async getUser(
    queryObj: Partial<UserModel> | MongoQueryModel,
    populatedFields = [],
    selectedFields: string[] = [],
  ): Promise<UserModel | null> {
    try {
      return await this.usersRepo.findOne(
        queryObj,
        populatedFields,
        selectedFields,
      );
    } catch (err) {
      this.logService.error(err.toString());
    }

    return null;
  }

  async matchPassword(user: UserModel, password: string): Promise<boolean> {
    try {
      return await this.usersRepo.isPasswordMatch(user, password);
    } catch (err) {
      this.logService.error(err.toString());
    }

    return false;
  }

  async getDbUsers(
    queryObj: Partial<UserModel>,
    selected: string[],
    recordsPerPage: number = AppConstants.recordsPerPage,
    poplucatedFields = [],
    sortField = 'email',
    sortOrder = -1,
    offset = 0,
  ): Promise<UserModel[] | null> {
    try {
      return await this.usersRepo.findAll(
        queryObj,
        sortField,
        sortOrder,
        recordsPerPage,
        offset,
        poplucatedFields,
        selected,
      );
    } catch (err) {
      this.logService.error(err.toString());
    }

    return null;
  }

  async getDbTotalUsersCount(
    queryObj: Partial<UserModel>,
  ): Promise<number | null> {
    try {
      return (await this.usersRepo.getCount(queryObj)).totalRecords;
    } catch (error) {
      this.logService.error(error.toString());
    }

    return null;
  }
}
