import sqlite3 from 'better-sqlite3';
import { load_sql_query } from './load-sql-query.js';
import { MIGRATION_SQL_MAP } from '../contants.js';

export function ensure_migrations_table_exists(db: sqlite3.Database) {
  const sql = load_sql_query(MIGRATION_SQL_MAP.CREATE_MIGRATIONS_TABLE_SQL, 'migrations');
  db.exec(sql);
}
