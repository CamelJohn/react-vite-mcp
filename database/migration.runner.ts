import Database from 'better-sqlite3';

import { PATHS } from './contants.js';

import { ensure_migrations_table_exists } from './utils/ensure-migartions-table-exists.js';
import { run_migrations } from './utils/run-migrations.js';

const db = new Database(PATHS.DB_PATH);

ensure_migrations_table_exists(db);

run_migrations(db);
