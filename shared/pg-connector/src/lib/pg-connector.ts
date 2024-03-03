// postgresPool.ts
import { inject, injectable } from 'inversify';
import { Pool, PoolConfig, QueryResult } from 'pg';

export type PostgresPoolOptions = PoolConfig

@injectable()
export class PGConnector {
  private pool: Pool;

  constructor(@inject('PGConnectionConfig')
    options: PostgresPoolOptions) {
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
