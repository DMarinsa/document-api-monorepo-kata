import { Logger } from "@org/types";
import winston, { Logger as WinstonLoggerType } from 'winston';



export class WinstonLogger implements Logger {
    private readonly logger: WinstonLoggerType

    constructor() {
        this.logger = winston.createLogger({
            format: winston.format.combine(
              winston.format.prettyPrint(),
              winston.format.errors({ stack: true }),
              winston.format.splat(),
              winston.format.simple(),
              winston.format.printf((info: { message: string; level: string; }) => {
                if (typeof info.message === 'object')
                  info.message = `${info.level}: ${JSON.stringify(info.message, null, 2)}`;
                else info.message = `${info.level}: ${info.message}`;
                return info.message;
              })
            ),
            transports: [
              new winston.transports.Console(),
            ],
          });
    }
    info(message: string): void {
        this.logger.debug(message);
    }
    error(message: string): void {
        this.logger.error(message);
    }
    warn(message: string): void {
        this.logger.info(message);
    }

}