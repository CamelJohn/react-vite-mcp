import fs from 'node:fs';
import { PATHS } from '../contants.js';

export function discover_physical_migration_scripts() {
  return fs
    .readdirSync(PATHS.MIGRATIONS_DIR)
    .filter((file) => file.endsWith('.sql'))
    .sort();
}
