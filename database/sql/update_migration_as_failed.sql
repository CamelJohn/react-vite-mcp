UPDATE migrations
SET 
    status = 'failed', 
    message = ?
WHERE migration_name = ?;