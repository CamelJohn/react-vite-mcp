#!/usr/bin/env node

import { init } from './tools/init';
import { feature } from './tools/feature';

const [, , cmd, ...args] = process.argv;

const commands_map: Map<string, [(args: any) => Promise<any>, any]> = new Map([
  ['init', [init, { name: args }]],
  ['feature', [feature, { parent: args[0], name: args[1], route: args[2] }]],
]);

commands_map.get(cmd)?.[0](commands_map.get(cmd)?.[1]);

async function main() {
  switch (cmd) {
    case 'init': {
      const [name] = args;
      if (!name) throw new Error('Usage: cli init <name>');
      await init({ name });
      break;
    }
    case 'feature': {
      const [parent, name] = args;
      if (!parent || !name) throw new Error('Usage: cli feature <parent> <name>');
      await feature({ parent, name });
      break;
    }
    default: {
      console.log(`Unknown command: ${cmd}`);
      process.exit(1);
    }
  }
}

main().catch((error) => {
  console.error('Error:', error);
  process.exit(1);
});
