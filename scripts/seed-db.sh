#!/usr/bin/env bash
set -euo pipefail

DB_FILE="src/database/mcp.db"

if [ ! -f "$DB_FILE" ]; then
  echo "Database does not exist. Run db:init first."
  exit 1
fi

echo "Seeding database..."
# Add your INSERT statements here

echo "✅ Database seeded"
