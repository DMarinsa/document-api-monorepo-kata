import { dependencyInjection } from './dependency-injection';

describe('dependencyInjection', () => {
  it('should work', () => {
    expect(dependencyInjection()).toEqual('dependency-injection');
  });
});
