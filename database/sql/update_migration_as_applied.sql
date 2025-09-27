UPDATE migrations 
SET status = 'applied'
WHERE migration_name = ?;