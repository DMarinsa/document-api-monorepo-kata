import { Container } from 'inversify';
import 'reflect-metadata';

export class DependencyInjectionManager {
  public container: Container

  constructor() {
    this.container = new Container();
  }

  bindToContainer(key: string, value: any) {
    this.container.bind(key).to(value);
  }
}