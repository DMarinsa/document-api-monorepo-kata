/* eslint-disable @typescript-eslint/no-explicit-any */
import { PGConnector, PostgresPoolOptions } from './pg-connector';
import { Pool, QueryConfig, QueryResult } from 'pg';

jest.mock('pg', () => {
  const mPoolClient = {
    query: jest.fn(() => ({
      rows: [{ id: 1, name: 'Test' }],
      rowCount: 1,
      command: 'SELECT',
      oid: 0,
      fields: []
    })),
    release: jest.fn()
  };
  const mPool = {
    connect: jest.fn().mockResolvedValue(mPoolClient),
    end: jest.fn()
  };
  return {
    Pool: jest.fn(() => mPool)
  };
});

function createMockPool(): any {
  return new (Pool as jest.MockedClass<typeof Pool>)();
}

describe('pgConnector', () => {

  let pgConnector: PGConnector;
  let mockPool: jest.Mocked<Pool>;

  beforeEach(() => {
    const postgresOptions: PostgresPoolOptions = {
      user: 'test_user',
      password: 'test_password',
      host: 'test_host',
      database: 'test_db',
      port: 5432
    };
    mockPool = createMockPool();
    pgConnector = new PGConnector(postgresOptions);
    (pgConnector as any).pool = mockPool;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('instantiates', () => {
    const connector = new PGConnector({ connectionString: 'test' });
    expect(connector).toBeInstanceOf(PGConnector);
  })

  it('exposes a query method', () => {
    const connector = new PGConnector({ connectionString: 'test' });
    
    expect(connector.query).toBeInstanceOf(Function);
  });

  it('exposes a close method', () => {
    const connector = new PGConnector({ connectionString: 'test' });
    
    expect(connector.close).toBeInstanceOf(Function);
  });

  describe('query', () => {
    it('calls pool.connect and pool.query with the given queryConfig', async () => {
      const queryConfig: QueryConfig = {
        text: 'SELECT * FROM test_table'
      };
      const expectedResult: QueryResult<any> = {
        rows: [{ id: 1, name: 'Test' }],
        rowCount: 1,
        command: 'SELECT',
        oid: 0,
        fields: []
      };

      const result = await pgConnector.query(queryConfig);

      expect(result).toEqual(expectedResult);

      expect(mockPool.connect).toHaveBeenCalledTimes(1);
      expect((await mockPool.connect()).query).toHaveBeenCalledWith(queryConfig);
    });

    it('should release the client after executing the query', async () => {
      const queryConfig: QueryConfig = {
        text: 'SELECT * FROM test_table'
      };

      await pgConnector.query(queryConfig);

      expect(mockPool.connect).toHaveBeenCalledTimes(1);
      expect((await mockPool.connect()).release).toHaveBeenCalledTimes(1);
    });
  });

  describe('close', () => {
    it('closes the connection', async () => {
      const connector = new PGConnector({ connectionString: 'test' });
      
      await connector.close();

      expect(mockPool.end).toHaveBeenCalledTimes(1);
    });
  });
});
