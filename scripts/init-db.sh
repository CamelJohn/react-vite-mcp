#!/usr/bin/env bash
set -euo pipefail

DB_FILE="src/database/mcp.db"
MIGRATIONS_DIR="src/database/migrations"
FIRST_MIGRATION="0000_create_migrations_table.sql"

# 1️⃣ Create DB file if it doesn't exist
if [ ! -f "$DB_FILE" ]; then
  touch "$DB_FILE"
  echo "✅ Database created at $DB_FILE"
fi

# 2️⃣ Apply first migration
sqlite3 "$DB_FILE" < "$MIGRATIONS_DIR/$FIRST_MIGRATION"
echo "✅ Applied migration: $FIRST_MIGRATION"
