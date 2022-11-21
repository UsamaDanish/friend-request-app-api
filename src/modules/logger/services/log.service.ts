import { Logger } from 'winston';
import { Injectable } from '@nestjs/common';

import { WinstonHelper } from '@/modules/logger/helpers';

@Injectable()
export class LogService {
  private logger: Logger;

  constructor(winstonHelper: WinstonHelper) {
    this.logger = winstonHelper.getLogger();
  }

  private writeLog(msg: any, level: string, reqId: string | null): void {
    if (typeof msg === 'object') {
      msg = JSON.stringify(msg);
    }

    this.logger[level as keyof Logger](msg, { reqId });
  }

  info(msg: unknown, reqId = null): void {
    this.writeLog(msg, 'info', reqId);
  }

  debug(msg: unknown, reqId = null): void {
    this.writeLog(msg, 'debug', reqId);
  }

  error(msg: unknown, reqId = null): void {
    if (msg instanceof Error) {
      this.writeLog(`${msg.name}: ${msg.message}`, 'error', reqId);
    } else {
      this.writeLog(msg, 'error', reqId);
    }
  }
}
