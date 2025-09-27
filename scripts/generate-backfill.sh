#!/usr/bin/env bash
set -euo pipefail

if [ $# -lt 1 ]; then
  echo "Usage: $0 <sql-script-name>"
  exit 1
fi

# Join all args into one string
SQL_SCRIPT_NAME=$(echo "$*" | tr ' ' '_' | tr '[:upper:]' '[:lower:]')
FILENAME="${SQL_SCRIPT_NAME}.sql"

SQL_DIR="src/database/backfill"
mkdir -p "$SQL_DIR"

touch "${SQL_DIR}/${FILENAME}"

echo "✅ SQL script created: ${SQL_DIR}/${FILENAME}"
