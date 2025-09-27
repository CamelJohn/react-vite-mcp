export function is_migration_file_applied(
  applied_migrations: Map<string, string>,
  migration_file_name: string
) {
  return (
    applied_migrations.has(migration_file_name) &&
    applied_migrations.get(migration_file_name) === 'applied'
  );
}
