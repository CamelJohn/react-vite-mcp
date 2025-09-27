export type MigrationScriptRecordStatus = 'pending' | 'applied' | 'failed';

export interface IMigrationScriptRecord {
  id: number;
  migration_name: string;
  applied_at: Date;
  checksum: string | null;
  description: string;
  status: MigrationScriptRecordStatus;
  message: string | null;
}
