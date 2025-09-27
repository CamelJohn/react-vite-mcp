import { build_paths } from './build-paths.js';

interface IBuildCopyCommandArgs {
  from: string;
  to: string[];
}

export function build_copy_command({ from, to }: IBuildCopyCommandArgs): string {
  const { from: resolvedFrom, to: resolvedTo } = build_paths({ from, to });
  return `cp -r ${resolvedFrom}/. ${resolvedTo}`;
}
