#!/usr/bin/env bash
set -euo pipefail

DB_FILE="src/database/mcp.db"
MIGRATIONS_DIR="src/database/migrations"

LAST_MIGRATION=$(ls "$MIGRATIONS_DIR"/*.sql | sort | tail -n 1)

if [ -z "$LAST_MIGRATION" ]; then
  echo "No migrations found"
  exit 1
fi

echo "Rolling back $(basename $LAST_MIGRATION)..."
# Implement rollback logic here (if you have DOWN statements)

echo "✅ Rolled back $(basename $LAST_MIGRATION)"