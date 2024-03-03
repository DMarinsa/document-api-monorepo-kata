import { Container } from 'inversify';
import { container } from './container';

describe('dependencyInjection', () => {
  it('exposes a container', () => {
    expect(container).toBeInstanceOf(Container);
  });
});
