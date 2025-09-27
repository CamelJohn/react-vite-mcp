import { CallToolResult } from '@modelcontextprotocol/sdk/types.js';

import { run_commands } from '../utils/run-commands.js';
import { build_copy_command } from '../utils/build-copy-command.js';

interface IIinitArgs {
  name: string;
}

export const init = async ({ name }: IIinitArgs): Promise<CallToolResult> => {
  const coppyInitTemplateCommand = build_copy_command({
    from: '../../templates/init',
    to: [name, 'src'],
  });

  const commands: string[] = [
    `npm create vite ${name} -- --template react-ts`,
    `cd ${name} && npm i react-router-dom`,
    `mkdir -p ${name}/src/{pages,shared,routes,layouts}`,
    `touch ${name}/src/routes/{provider.tsx,router.tsx,routes.tsx}`,
    `rm ${name}/src/{main.tsx,App.tsx,App.css}`,
    coppyInitTemplateCommand,
  ];

  await run_commands(commands);
  // @ts-ignore
  const { run_migration_scripts } = await import('../database/migration.runner.js');

  run_migration_scripts();

  return {
    content: [],
  };
};
