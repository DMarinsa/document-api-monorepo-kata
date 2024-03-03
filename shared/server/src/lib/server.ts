import { Logger } from '@org/types';
import * as http from 'http';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import helmet from 'koa-helmet';
import Router from 'koa-router';
import cors from 'koa2-cors';
import { ErrorRouteHandler } from './ErrorRouteHandler';
import { hostname } from 'os';
import { ErrorHandler } from './ErrorHandler';
import { bindDepedencies } from '../Infrastructure/DependencyInjection/bindDependencies';
import { DependencyInjectionManager } from '@org/dependency-injection';

export class Server {
  private httpServer?: http.Server;
  private app: Koa;
  private logger: Logger;
  public dependencyInjectionManager: DependencyInjectionManager;

  constructor(private readonly port: number, router: Router) {
    this.dependencyInjectionManager = new DependencyInjectionManager();
    bindDepedencies(this.dependencyInjectionManager);
    this.app = new Koa();
    this.logger = this.dependencyInjectionManager.getDependency('Logger') as Logger;
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
