import { Container } from 'inversify';
import { DependencyInjectionManager } from './DependencyInjectionManager';

describe(DependencyInjectionManager, () => {
  let dependencyInjectionManager;

  beforeEach(() => {
    dependencyInjectionManager = new DependencyInjectionManager();
  })

  it('instantiates', () => {
    expect(dependencyInjectionManager).toBeInstanceOf(DependencyInjectionManager);
  })
  it('exposes a container', () => {
    expect(dependencyInjectionManager.container).toBeInstanceOf(Container);
  });
});
