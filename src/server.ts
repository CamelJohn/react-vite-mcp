import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';

import z from 'zod';

import { init } from './tools/init.js';
import { feature } from './tools/feature.js';
import { context } from './tools/context.js';

export const server = new McpServer({
  name: 'React over Vite MCP server',
  title: 'React over Vite MCP server',
  description: 'An MCP server that helps developers & LLMs build React/Vite apps.',
  transport: new StdioServerTransport(),
  version: '1.0.0',
});

server.tool(
  'init',
  'init a react/vite/typescript project',
  {
    name: z.string().describe('The name of the project to be created'),
  },
  init
);

server.tool(
  'feature',
  'add a feature to the project',
  {
    parent: z.string().describe('The parent component or module where the feature will be added'),
    name: z.string().describe('The name of the feature to be added'),
    route: z.string().describe('The route for the feature, if applicable'),
  },
  feature
);

server.tool(
  'context',
  'add a shared context api to the project',
  {
    parent: z.string().describe('The parent component or module where the feature will be added'),
    name: z.string().describe('The name of the context to be added'),
  },
  context
);

async function main() {
  try {
    const transport = new StdioServerTransport();
    await server.connect(transport);
  } catch (error) {
    await server.close();
    console.error('Error:', error);
    process.exit(1);
  }
}

main().catch((error) => {
  console.error('Error:', error);
  process.exit(1);
});
