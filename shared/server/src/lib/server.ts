import { Logger } from '@org/types';
import * as http from 'http';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import helmet from 'koa-helmet';
import Router from 'koa-router';
import cors from 'koa2-cors';
import { ErrorRouteHandler } from './ErrorRouteHandler';
import { WinstonLogger } from '../Infrastructure/Loggers/WinstonLogger';
import { hostname } from 'os';
import { ErrorHandler } from './ErrorHandler';

export class Server {
  private httpServer?: http.Server;
  private app: Koa;
  private logger: Logger;

  constructor(private readonly port: number, router: Router) {
    
    this.app = new Koa();
    this.logger = new WinstonLogger();
    this.app.silent = true;
    this.app.use(helmet.xssFilter());
    this.app.use(helmet.noSniff());
    this.app.use(helmet.hidePoweredBy());
    this.app.use(helmet.frameguard({ action: 'deny' }));
    this.app.use(
      cors({
        origin: '*',
      })
    );
    this.app.use(bodyParser());
    this.app.use(ErrorRouteHandler).use(router.routes());
  }

  start = async (): Promise<void> => {
    return new Promise((resolve) => {
      this.httpServer = this.app.listen(this.port, () => {
        this.logger.info(`Server is running at ${hostname}:${this.port}`);
        resolve();
      });
      this.app.on('error', ErrorHandler);

    });
  };

  stop = async (): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (this.httpServer) {
        this.httpServer.close((error) => {
          if (error) {
            return reject(error);
          }
          return resolve();
        });
      }
      return resolve();
    });
  };

  getHTTPServer = () => {
    return this.httpServer;
  };

  
}
