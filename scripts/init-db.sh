#!/usr/bin/env bash
set -euo pipefail

DB_FILE="src/database/mcp.db"
SQL_DIR="src/database/sql"
CREATE_MIGRATIONS_TABLE="create_migrations_table.sql"

# 1️⃣ Create DB file if it doesn't exist
if [ ! -f "$DB_FILE" ]; then
  touch "$DB_FILE"
  echo "✅ Database created at $DB_FILE"
fi

# 2️⃣ Apply first migration
sqlite3 "$DB_FILE" < "$SQL_DIR/$CREATE_MIGRATIONS_TABLE"
echo "✅ Applied migration: $CREATE_MIGRATIONS_TABLE"
