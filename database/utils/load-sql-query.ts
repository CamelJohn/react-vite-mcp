import fs from 'node:fs';
import path from 'node:path';

export type QueryType = 'migrations' | 'sql' | 'backfills';

export function load_sql_query(fileName: string, type: QueryType = 'migrations'): string {
  const sqlFilePath = path.join(process.cwd(), 'src', 'database', type, fileName);

  if (!fs.existsSync(sqlFilePath)) {
    throw new Error(`SQL file not found: ${sqlFilePath}`);
  }

  return fs.readFileSync(sqlFilePath, 'utf-8');
}
