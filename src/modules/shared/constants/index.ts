import type { TransformFnParams } from 'class-transformer';

export const AppConstants = {
  routesPrefix: 'api',
  genericErrorMsg: 'Something went wrong.',
  appDateFormat: 'YYYY-MM-DD',
  appTimeFormat: 'HH:mm:ss',
  roundsForHashSalt: 10,
  appModes: {
    develop: 'develop',
    staging: 'staging',
    production: 'production',
  },
  dbSortOrders: {
    asc: 1,
    dsc: -1,
  },
  recordsPerPage: 10,
  errorMessages: {
    notFound: (name: string): string => `${name} Not Found`,
    fieldRequired: (fieldName: string): string => `${fieldName} is required`,
    invalidMongoId: (fieldName: string): string =>
      `${fieldName} is not a valid MongoId`,
  },
  accessTokenExpires: '4h',
  mongodbURI:
    'mongodb://localhost:27017/friend-request?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false',
  transformers: {
    number:
      (key: string) =>
      (x: TransformFnParams): number =>
        x.obj[key] ? Number(x.obj[key]) : x.obj[key],
  },
};
