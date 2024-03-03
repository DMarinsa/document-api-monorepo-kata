import { Container } from 'inversify';
import 'reflect-metadata';
import { WinstonLogger } from '@org/server';
import { Logger } from '@org/types';
const container = new Container();
container.bind<Logger>(WinstonLogger);
export { container };