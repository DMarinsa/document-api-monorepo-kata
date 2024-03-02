// postgresPool.ts
import { Pool, PoolConfig, QueryConfig, QueryResult, QueryResultRow } from 'pg';

export type PostgresPoolOptions = PoolConfig

export class PGConnector {
  private pool: Pool;

  constructor(options: PostgresPoolOptions) {
    this.pool = new Pool(options);
  }

  async query(rawQuery: string): Promise<QueryResult> {
    const client = await this.pool.connect();
    try {
      return client.query(rawQuery);
    } finally {
      client.release();
    }
  }

  async close(): Promise<void> {
    await this.pool.end();
  }
}
