import path from 'node:path';

const build_path_for = (entity: string) => path.join(process.cwd(), 'src', 'database', entity);

export const PATHS = {
  DB_PATH: build_path_for('mcp.db'),
  MIGRATIONS_DIR: build_path_for('migrations'),
  SQL_DIR: build_path_for('sql'),
  BACKFILL_DIR: build_path_for('backfills'),
};

export const MIGRATION_SQL_MAP = {
  CREATE_MIGRATIONS_TABLE_SQL: 'create_migrations_table.sql',
  LIST_APPLIED_MIGRATIONS_SQL: 'list_applied_migrations.sql',
  UPSERT_MIGRATION_AS_PENDING: 'upsert_migration_as_pending.sql',
  UPDATE_MIGRATION_AS_APPLIED: 'update_migration_as_applied.sql',
  UPDATE_MIGRATION_AS_FAILED: 'update_migration_as_failed.sql',
};
