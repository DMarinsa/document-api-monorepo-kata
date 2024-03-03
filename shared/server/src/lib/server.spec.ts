import Router from 'koa-router';
import { Server } from './server';

describe('server', () => {

  const mockRouter = new Router();
  it('should work', () => {
    expect(new Server(3000, mockRouter)).toBeInstanceOf(Server)
  });
});
