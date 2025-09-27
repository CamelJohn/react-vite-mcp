CREATE TABLE IF NOT EXISTS migrations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    migration_name TEXT NOT NULL UNIQUE,
    applied_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    rolled_back_at DATETIME,
    status TEXT NOT NULL CHECK(status IN('pending', 'applied', 'failed', 'rolled_back')),
    checksum TEXT,
    description TEXT NOT NULL DEFAULT ''
);

CREATE INDEX idx_migration_name ON migrations(migration_name);
CREATE INDEX idx_status ON migrations(status);