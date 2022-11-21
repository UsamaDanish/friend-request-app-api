import { Module, Global } from '@nestjs/common';

import { WinstonHelper } from '@/modules/logger/helpers';
import { LogService } from '@/modules/logger/services';

@Global()
@Module({
  providers: [WinstonHelper, LogService],
  exports: [LogService],
})
export class LoggerModule {}
