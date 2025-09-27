import { buildPaths } from './build-paths.js';

interface IBuildCopyCommandArgs {
  from: string;
  to: string[];
}

export function buildCopyCommand({ from, to }: IBuildCopyCommandArgs): string {
  const { from: resolvedFrom, to: resolvedTo } = buildPaths({ from, to });
  return `cp -r ${resolvedFrom}/. ${resolvedTo}`;
}
