import { Server } from '@org/server';
import Router from 'koa-router';
import { registerRoutes } from './Documents/Infrastructure/routes/registerRoutes';

try {
  const port = parseInt(process.env.PORT || '3000');
  const router = new Router();

  registerRoutes(router);

  new Server(port, router).start();
} catch (error) {
  console.log(error);
  process.exit(1);
}
