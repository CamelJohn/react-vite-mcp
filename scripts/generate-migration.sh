#!/usr/bin/env bash
set -euo pipefail

if [ $# -lt 1 ]; then
  echo "Usage: $0 <migration-name>"
  exit 1
fi

# Join all args into one string
MIGRATION_NAME=$(echo "$*" | tr ' ' '_' | tr '[:upper:]' '[:lower:]')
TIMESTAMP=$(date +"%Y%m%d%H%M%S")
UP_FILENAME="${TIMESTAMP}_${MIGRATION_NAME}_UP.sql"
DOWN_FILENAME="${TIMESTAMP}_${MIGRATION_NAME}_DOWN.sql"

MIGRATIONS_DIR="src/database/migrations"
mkdir -p "$MIGRATIONS_DIR"

touch "${MIGRATIONS_DIR}/${UP_FILENAME}"
touch "${MIGRATIONS_DIR}/${DOWN_FILENAME}"

echo "✅ Migration created: ${MIGRATIONS_DIR}/${UP_FILENAME}"
echo "✅ Migration created: ${MIGRATIONS_DIR}/${DOWN_FILENAME}"
