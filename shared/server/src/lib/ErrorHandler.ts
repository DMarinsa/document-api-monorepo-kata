import { Context } from 'koa';

import { Logger } from '@org/types';
import { WinstonLogger } from '../Infrastructure/Loggers/WinstonLogger';

const logger: Logger = new WinstonLogger();

export const ErrorHandler = (error: Error, ctx: Context) => {
  logger.error(`Error: ${ctx.status} - ${ctx.message}`);

  if (error instanceof Error) {
    logger.error(error.stack || error.message);
    logger.error(JSON.stringify(ctx.body, null, 2));
  }
};
