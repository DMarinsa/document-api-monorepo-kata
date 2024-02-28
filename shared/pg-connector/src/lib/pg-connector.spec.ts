import { pgConnector } from './pg-connector';

describe('pgConnector', () => {
  it('should work', () => {
    expect(pgConnector()).toEqual('pg-connector');
  });
});
