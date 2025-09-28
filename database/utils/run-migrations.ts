import sqlite3 from 'better-sqlite3';
import path from 'node:path';
import { list_applied_migrations } from './list-records-from-migrations-table.js';
import { discover_physical_migration_scripts } from './discover-physical-migration-scripts.js';
import { MIGRATION_SQL_MAP, PATHS } from '../contants.js';
import { load_sql_query } from './load-sql-query.js';
import { compute_checksum } from './compute-checksum.js';
import { is_migration_file_applied } from './is-migration-file-applied.js';
import { build_migration_transaction } from './build-migration-transaction.js';

export function run_migrations(db: sqlite3.Database) {
  const applied_migrations = list_applied_migrations(db);
  const migration_files = discover_physical_migration_scripts();

  for (const migration_file of migration_files) {
    const migration_file_name = migration_file.replace(/\.sql$/, '');

    const is_file_applied = is_migration_file_applied(applied_migrations, migration_file_name);

    if (is_file_applied) {
      console.log(`✅ Already applied: ${migration_file_name}`);
      continue;
    }

    const file_path = path.join(PATHS.MIGRATIONS_DIR, migration_file);
    const query = load_sql_query(migration_file, 'migrations');
    const checksum = compute_checksum(file_path);

    console.log(`⏳ Running migration: ${migration_file_name}`);

    const migration_transaction = build_migration_transaction(
      db,
      migration_file_name,
      checksum,
      query
    );

    try {
      migration_transaction();
      console.log(`✅ Migration applied: ${migration_file_name}`);
    } catch (error) {
      const query = load_sql_query(MIGRATION_SQL_MAP.UPDATE_MIGRATION_AS_FAILED, 'sql');
      if (error instanceof Error) {
        db.prepare(query).run(error.message, migration_file_name);
        console.error(`❌ Migration failed: ${migration_file_name}`, error.message);
      } else {
        db.prepare(query).run(
          'unhandled error (error is not instance of Error)',
          migration_file_name
        );
        console.error(
          `❌ Migration failed: ${migration_file_name}`,
          'unhandled error (error is not instance of Error)'
        );
      }
      process.exit(1);
    }
  }
}
