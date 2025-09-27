#!/usr/bin/env bash
set -euo pipefail

if [ $# -lt 1 ]; then
  echo "Usage: $0 <migration-name>"
  exit 1
fi

# Join all args into one string
MIGRATION_NAME=$(echo "$*" | tr ' ' '_' | tr '[:upper:]' '[:lower:]')
TIMESTAMP=$(date +"%Y%m%d%H%M%S")
FILENAME="${TIMESTAMP}_${MIGRATION_NAME}.sql"

MIGRATIONS_DIR="src/database/migrations"
mkdir -p "$MIGRATIONS_DIR"

touch "${MIGRATIONS_DIR}/${FILENAME}"

echo "✅ Migration created: ${MIGRATIONS_DIR}/${FILENAME}"
