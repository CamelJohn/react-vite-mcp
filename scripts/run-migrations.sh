#!/usr/bin/env bash
set -euo pipefail

DB_FILE="src/database/mcp.db"
MIGRATIONS_DIR="src/database/migrations"

mkdir -p "$(dirname "$DB_FILE")"
touch "$DB_FILE"

echo "Running migrations..."
for FILE in $(ls "$MIGRATIONS_DIR"/*.sql | sort); do
  echo "Applying $(basename $FILE)..."
  sqlite3 "$DB_FILE" < "$FILE"
done

echo "✅ All migrations applied"
