import { CallToolResult } from '@modelcontextprotocol/sdk/types.js';

import { run_commands } from '../utils/run-commands.js';
import { buildCopyCommand } from '../utils/build-copy-command.js';

interface IIinitArgs {
  name: string;
}

export const init = async ({ name }: IIinitArgs): Promise<CallToolResult> => {
  const coppyCommand = buildCopyCommand({ from: '../../templates/init', to: [name, 'src'] });

  const commands: string[] = [
    `npm create vite ${name} -- --template react-ts`,
    `cd ${name} && npm i react-router-dom`,
    `mkdir -p ${name}/src/{pages,shared,routes,layouts}`,
    `touch ${name}/src/routes/{provider.tsx,router.tsx,routes.tsx}`,
    `rm ${name}/src/{main.tsx,App.tsx,App.css}`,
    coppyCommand,
  ];

  await run_commands(commands);

  return {
    content: [],
  };
};
