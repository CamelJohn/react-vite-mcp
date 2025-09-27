# react-vite-mcp

[![npm version](https://img.shields.io/npm/v/@hebejebe/react-vite-mcp)](https://www.npmjs.com/package/@hebejebe/react-vite-mcp)

A CLI to scaffold React + Vite apps with context & feature generation.

## Installation

```bash
npm install @hebejebe/react-vite-mcp
```

## The general idea here

I built this mcp/cli so that I could shift the claude cli usage from being a code generator, to an orchestrator (Also, save many many tokens from my subscription plan).

I hope this helps you too.

This mcp is oppinionated as am I when it comes to planning/building/architecting a frontend app.

## The vision

when working in teams, you can allways have discussions about how to architect a project, and what the best practices are. here, they are baked in, and all you have to do is fill in the logic where needd.

also, if your'e using claude CLI (hopefully any other llm cli) you can focus on writing a plan with claude, and hand this mcp over to claude to just do the work for you.

## Current Features

- Init - can be used from the terminal to get you up and running with a react/vite app
- Feature - will add what I currently consider is a end to end feature boilerplate, as well as connect it to the router
- Context - will add a context boilerplate & wrap root routes provider with the context provider

## Commands & Usage

- `npx react-vite-mcp init <project-name>` - will create a new folder with the project name, and scaffold a react/vite app in it
- `npx react-vite-mcp feature <project-name> <FeatureName>` - will add a new feature to the current project
- `npx react-vite-mcp context <project-name> <ContextName>` - will add a new context to the current project

## Roadmap

See [roadmap.md](./roadmap.md)
