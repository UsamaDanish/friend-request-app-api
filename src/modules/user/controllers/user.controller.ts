import { PaginatedRes } from '@/modules/shared/decorators/paginated-res.decorator';
import { PaginationReq } from '@/modules/shared/models/pagination.req';
import { PaginationRes } from '@/modules/shared/models/pagination.res';
import { Controller, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserModel } from '../models';
import { UserService } from '../services';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiBearerAuth()
  @Get()
  @PaginatedRes(UserModel)
  getUsers(@Query() query: PaginationReq): Promise<PaginationRes<UserModel>> {
    return this.userService.getUsers(query);
  }
}
