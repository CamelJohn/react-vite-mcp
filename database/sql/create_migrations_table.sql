CREATE TABLE IF NOT EXISTS migrations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    migration_name TEXT NOT NULL UNIQUE,
    applied_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    status TEXT NOT NULL CHECK(status IN('pending', 'applied', 'failed')),
    checksum TEXT,
    description TEXT NOT NULL DEFAULT '',
    message TEXT
);

CREATE INDEX IF NOT EXISTS idx_migration_name ON migrations(migration_name);
CREATE INDEX IF NOT EXISTS idx_status ON migrations(status);
