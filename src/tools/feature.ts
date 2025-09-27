import fs from 'node:fs/promises';
import path from 'node:path';

import { CallToolResult } from '@modelcontextprotocol/sdk/types.js';

import { run_commands } from '../utils/run-commands.js';
import { build_copy_command } from '../utils/build-copy-command.js';

interface IAppendRouteArgs {
  kebabCaseName: string;
  parent: string;
  errorBoundary: string;
  loader: string;
  action: string;
  middleware: string;
  Component: string;
}

const append_route = async ({
  kebabCaseName,
  parent,
  errorBoundary,
  loader,
  action,
  middleware,
  Component,
}: IAppendRouteArgs) => {
  const ROUTER_FILE_PATH = path.join(parent, 'src', 'routes', 'routes.tsx');
  let content = await fs.readFile(ROUTER_FILE_PATH, 'utf-8');

  const importLine = `import { ${Component}, ${errorBoundary}, ${loader}, ${action}, ${middleware} } from '../pages/${kebabCaseName}';\n`;

  content = importLine + content;

  const childrenRegex = /(children\s*:\s*\[\s*)([\s\S]*?)(\])/m;

  if (childrenRegex.test(content)) {
    content = content.replace(childrenRegex, (match, p1, p2, p3) => {
      const newEntry = `  {\n    path: "/${kebabCaseName}",\n    Component: ${Component},\n    loader: ${loader},\n    action: ${action},\n    ErrorBoundary: ${errorBoundary},\n    middleware: [${middleware}]\n  },\n`;
      return `${p1}${p2}${newEntry}${p3}`;
    });
  }

  await fs.writeFile(ROUTER_FILE_PATH, content, 'utf-8');
};

interface IFeatureArgs {
  parent: string;
  name: string;
}

export const feature = async ({ parent, name }: IFeatureArgs): Promise<CallToolResult> => {
  const pascalCaseName = name.charAt(0).toUpperCase() + name.slice(1);
  const kebabCaseName = name.toLowerCase();
  const camelCaseName = name.charAt(0).toLowerCase() + name.slice(1);

  const copyCommand = build_copy_command({
    from: '../../templates/feature',
    to: [parent, 'src', 'pages', kebabCaseName],
  });

  const commands: string[] = [
    `mkdir -p ${parent}/src/pages/${kebabCaseName}`,
    `touch ${parent}/src/pages/${kebabCaseName}/{page.tsx,page.module.css,action.ts,loader.ts,middleware.ts,error.boundary.tsx}`,
    copyCommand,
    `cd ${parent}/src/pages/${kebabCaseName} && find . -type f -exec sed -i '' "s/_class_/${pascalCaseName}/g" {} \\;`,
    `cd ${parent}/src/pages/${kebabCaseName} && find . -type f -exec sed -i '' "s/_function_/${camelCaseName}/g" {} \\;`,
  ];

  await run_commands(commands);

  await append_route({
    kebabCaseName,
    parent,
    errorBoundary: `${pascalCaseName}ErrorBoundary`,
    loader: `${camelCaseName}Loader`,
    action: `${camelCaseName}Action`,
    middleware: `${camelCaseName}Middleware`,
    Component: `${pascalCaseName}Page`,
  });

  return {
    content: [{ type: 'text', text: `Feature ${name} added successfully.` }],
  };
};
