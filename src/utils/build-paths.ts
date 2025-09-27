import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface IBuildPathsArgs {
  from: string;
  to: string[];
}

export function buildPaths({ from, to }: IBuildPathsArgs) {
  return {
    from: path.join(__dirname, from),
    to: path.join(process.cwd(), ...to),
  };
}
