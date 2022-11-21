import { applyDecorators, Type } from '@nestjs/common';
import { ApiOkResponse, getSchemaPath } from '@nestjs/swagger';

import { PaginationRes } from '@/modules/shared/models/pagination.res';

export const PaginatedRes = <T extends Type<any>>(model: T): any => {
  return applyDecorators(
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(PaginationRes) },
          {
            properties: {
              totalRecords: {
                type: 'number',
              },
              res: {
                type: 'array',
                items: { $ref: getSchemaPath(model) },
              },
            },
          },
        ],
      },
    }),
  );
};
