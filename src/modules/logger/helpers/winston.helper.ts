import { createLogger, format, transports, Logger } from 'winston';
import { Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import 'winston-daily-rotate-file';

import { LoggerConstants } from '@/modules/logger/constants';
import { AppConstants } from '@/modules/shared/constants';

@Injectable()
export class WinstonHelper {
  private logsFilePath: string;

  constructor() {
    this.logsFilePath = path.join(
      LoggerConstants.logsDirectory,
      LoggerConstants.logsFileName,
    );

    this.createDirectory();
  }

  private createDirectory(): void {
    if (!fs.existsSync(LoggerConstants.logsDirectory)) {
      fs.mkdirSync(LoggerConstants.logsDirectory);
    }
  }

  getLogger(): Logger {
    const winstonLogger = createLogger({
      format: format.combine(
        format.timestamp({
          format: `${AppConstants.appDateFormat} ${AppConstants.appTimeFormat}`,
        }),
        format.json(),
      ),
      transports: [
        new transports.Console(),
        new transports.DailyRotateFile({
          filename: `${this.logsFilePath}-%DATE%.log`,
          datePattern: AppConstants.appDateFormat,
          maxFiles: LoggerConstants.logsFileLimit,
        }),
      ],
      level: 'debug',
    });

    return winstonLogger;
  }
}
