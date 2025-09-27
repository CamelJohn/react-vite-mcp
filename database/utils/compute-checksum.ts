import fs from 'node:fs';
import crypto from 'node:crypto';

export function compute_checksum(filePath: string): string {
  const data = fs.readFileSync(filePath);
  return crypto.createHash('sha256').update(data).digest('hex');
}
