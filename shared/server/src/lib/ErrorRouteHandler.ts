import { BusinessError, ValidationError } from '@org/types';
import { Context, Next } from 'koa';

export const ErrorRouteHandler = async (ctx: Context, next: Next) => {
  try {
    await next();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error instanceof ValidationError) {
      ctx.status = 403;
      ctx.body = {
        message: error.message,
        context: error.context,
      };
      ctx.app.emit('error', error, ctx);
      return;
    }

    if (error instanceof BusinessError) {
      ctx.status = 400;
      ctx.body = {
          message: error.message,
          context: error.context,
      };
      ctx.app.emit('error', error, ctx);
      return;
    }

    ctx.status = 500;
    error.message = error.message || 'Internal Server Error';
    ctx.app.emit('error', error, ctx);
  }
};
