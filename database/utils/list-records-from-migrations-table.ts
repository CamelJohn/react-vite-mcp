import sqlite3 from 'better-sqlite3';
import { load_sql_query } from './load-sql-query.js';
import { MIGRATION_SQL_MAP } from '../contants.js';
import { IMigrationScriptRecord } from '../types/migration.js';

export function list_applied_migrations(db: sqlite3.Database): Map<string, string> {
  const query = load_sql_query(MIGRATION_SQL_MAP.LIST_APPLIED_MIGRATIONS_SQL, 'sql');
  const rows = db
    .prepare<[], Pick<IMigrationScriptRecord, 'status' | 'migration_name'>>(query)
    .all();
  return new Map(rows.map((record) => [record.migration_name, record.status]));
}
