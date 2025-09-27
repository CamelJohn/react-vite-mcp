# Database Module

This module adds **SQLite support** to the project with a lightweight migration system.
It is designed so the CLI (MCP) can track metadata (projects, routes, pages, contexts, etc.) without requiring the consumer to repeat themselves.

---

## Structure

```
src/
  database/
    migrations/     # SQL migration files
    sql/            # Reusable queries/snippets (optional)
    index.ts        # SQLite initialization and migration runner
scripts/
  generate-migration.sh
```

---

## Migrations

Migrations are written in **real SQL files** (`.sql`) and tracked in a `migrations` table to ensure they are executed only once.

### Creating a migration

```bash
npm run generate:migration <name>
```

Examples:

```bash
npm run generate:migration create migrations table
npm run generate:migration add projects table
```

This generates a timestamped `.sql` file under `src/database/migrations/`, e.g.:

```
20250927124530_create_migrations_table.sql
```

---

## Scripts

### `scripts/generate-migration.sh`

- Creates a new timestamped migration file.
- Supports multi-word names (spaces → `_`).
- Example:

  ```
  ./scripts/generate-migration.sh add users table
  ```

### Migration Runner (`src/database/index.ts`)

- On startup, connects to SQLite.
- Ensures the `migrations` table exists.
- Executes any pending `.sql` migrations in order.
- Records executed migrations in the `migrations` table.

---

## Usage

1. **Create a migration**:

   ```bash
   npm run generate:migration add projects table
   ```

2. **Write your SQL** inside the generated file:

   ```sql
   -- up
   CREATE TABLE projects (
     id INTEGER PRIMARY KEY AUTOINCREMENT,
     name TEXT NOT NULL,
     created_at DATETIME DEFAULT CURRENT_TIMESTAMP
   );

   -- down
   DROP TABLE projects;
   ```

3. **Run your app / CLI**
   On startup, migrations will be applied automatically.

---

## Example Tables

- `migrations` – tracks which migrations have run.
- `projects` – stores app-level projects.
- `features` – tracks features linked to projects.
- `routes`, `pages`, `contexts`, `components` – metadata about scaffolded code.
- `logs` – (optional) records tool usage/events.

---

## Roadmap

- [ ] Add logging table
- [ ] CLI commands to list migrations (`list-migrations`)
- [ ] CLI command to rollback last migration (`rollback`)
- [ ] Snapshot/export DB state
