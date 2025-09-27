import { CallToolResult } from '@modelcontextprotocol/sdk/types.js';

import path from 'node:path';
import fs from 'node:fs';

import { run_commands } from '../utils/run-commands.js';
import { build_copy_command } from '../utils/build-copy-command.js';

interface IIcontextArgs {
  name: string;
  parent: string;
}

const wrap_with_context = (projectPath: string, contextName: string, name: string) => {
  const mainFilePath = path.join(projectPath, 'src', 'main.tsx');

  if (!fs.existsSync(mainFilePath)) throw new Error('main.tsx not found');

  let content = fs.readFileSync(mainFilePath, 'utf-8');

  const importLine = `import { ${contextName}Provider } from './shared/context/${name}';`;

  if (!content.includes(importLine)) {
    const lastImportIndex = content.lastIndexOf('import ');

    if (lastImportIndex !== -1) {
      const afterLineBreak = content.indexOf('\n', lastImportIndex) + 1;
      content =
        content.slice(0, afterLineBreak) + importLine + '\n' + content.slice(afterLineBreak);
    } else {
      content = importLine + '\n' + content;
    }
  }

  // Wrap MainRoutesProvider
  content = content.replace(
    /(<MainRoutesProvider\s*\/>)/,
    `<${contextName}Provider>$1</${contextName}Provider>`
  );

  fs.writeFileSync(mainFilePath, content, 'utf-8');
};

export const context = async ({ name, parent }: IIcontextArgs): Promise<CallToolResult> => {
  const pascalCaseName = name.charAt(0).toUpperCase() + name.slice(1);
  const copyCommand = build_copy_command({
    from: '../../templates/context',
    to: [parent, 'src', 'shared', 'context', name],
  });

  const commands: string[] = [
    `mkdir -p ${parent}/src/shared/context/${name}`,
    copyCommand,
    `cd ${parent}/src/shared/context/${name} && find . -type f -exec sed -i '' "s/Placeholder/${pascalCaseName}/g" {} \\;`,
    `find ./${parent}/src/shared/context/${name} -depth -name "*Placeholder*" -exec bash -c 'f="{}"; mv "$f" "\${f//Placeholder/${pascalCaseName}}"' \\;`,
  ];

  await run_commands(commands);

  wrap_with_context(path.join(process.cwd(), parent), pascalCaseName, name);

  return {
    content: [],
  };
};
