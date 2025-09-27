import sqlite3 from 'better-sqlite3';
import { load_sql_query } from './load-sql-query.js';
import { MIGRATION_SQL_MAP } from '../contants.js';

export function build_migration_transaction(
  db: sqlite3.Database,
  migration_file_name: string,
  checksum: string,
  migration: string
): sqlite3.Transaction {
  const set_migration_as_pending = load_sql_query(
    MIGRATION_SQL_MAP.UPSERT_MIGRATION_AS_PENDING,
    'sql'
  );
  const update_migration_as_applied = load_sql_query(
    MIGRATION_SQL_MAP.UPDATE_MIGRATION_AS_APPLIED,
    'sql'
  );

  return db.transaction(() => {
    db.prepare(set_migration_as_pending).run(migration_file_name, checksum);
    db.exec(migration);

    db.prepare(update_migration_as_applied).run(migration_file_name);
  });
}
