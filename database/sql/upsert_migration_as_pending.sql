INSERT INTO migrations (
    migration_name,
    applied_at,
    status,
    checksum,
    description
)
VALUES (?, datetime('now'), 'pending', ?, ?)
ON CONFLICT(migration_name) DO UPDATE SET 
status = excluded.status,
applied_at= excluded.applied_at,
checksum = excluded.checksum;