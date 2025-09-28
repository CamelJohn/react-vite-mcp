import Database from 'better-sqlite3';

import { PATHS } from './contants.js';

import { ensure_migrations_table_exists } from './utils/ensure-migartions-table-exists.js';
import { run_migrations } from './utils/run-migrations.js';

export function run_migration_scripts() {
  try {
    const db = new Database(PATHS.DB_PATH);
    ensure_migrations_table_exists(db);
    run_migrations(db);
    console.log('✅ Migrations complete');
  } catch (err) {
    console.error('❌ Migration error:', err);
    process.exit(1);
  }
}

run_migration_scripts();
