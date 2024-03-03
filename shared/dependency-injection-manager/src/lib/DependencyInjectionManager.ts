import { Container } from 'inversify';
import 'reflect-metadata';

export class DependencyInjectionManager {
  public container: Container

  constructor() {
    this.container = new Container();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  bindToContainer(key: string, value: any) {
    this.container.bind(key).to(value);
  }
  
  getDependency(key: string) {
    return this.container.get(key);
  }
}