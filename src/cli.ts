#!/usr/bin/env node

import { init } from './tools/init';
import { feature } from './tools/feature';
import { context } from './tools/context';

const [, , cmd, ...args] = process.argv;

const commands_map: Map<string, (args: any) => Promise<any>> = new Map([
  [
    'init',
    async ([name]) => {
      if (!name) throw new Error('Usage: reaact-vite-mcp init <name>');
      await init({ name });
    },
  ],
  [
    'feature',
    async ([parent, name]) => {
      if (!parent || !name) throw new Error('Usage: reaact-vite-mcp feature <parent> <name>');
      await feature({ parent, name });
    },
  ],
  [
    'context',
    async ([parent, name]) => {
      if (!name) throw new Error('Usage: reaact-vite-mcp context <name>');
      if (!parent) throw new Error('Usage: reaact-vite-mcp context <parent>');
      await context({ name, parent });
    },
  ],
]);

const commandFn = commands_map.get(cmd);
if (!commandFn) {
  console.log(`Unknown command: ${cmd}`);
  process.exit(1);
}

commandFn(args).catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});
