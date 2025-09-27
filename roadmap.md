# Claude CLI MCP Roadmap

This roadmap outlines the planned improvements for the `react-vite-mcp` library to make it fully consumable by Claude CLI and other LLM orchestrators.

---

## 1. LLM / Automation First

- **Idempotent commands:** Ensure every CLI command can be run multiple times safely.
- **Structured output:** Return JSON objects with:

  - Files created
  - Paths modified
  - Import statements added
  - Warnings or errors

- **Atomic operations:** Commands should succeed fully or not modify the project at all.

## 2. Project Introspection

- **Detect existing features/contexts:** Enable querying existing scaffolding.
- **Metadata manifests:** Each project, feature, or context should have a JSON manifest detailing files, hooks, and routes.
- **Dependency tracking:** Track which contexts wrap which providers.

## 3. Config & Defaults

- **Central config file (`.mcp.json`):** Store:

  - Default project folder
  - Default templates
  - Last used features
  - Naming conventions

- **Optional CLI flags:** Commands should use defaults when arguments are missing.

## 4. Template Automation

- **Dynamic replacements:** Handle placeholder names, PascalCase, camelCase, filenames.
- **Safe import injection:** Update `main.tsx` or route files without overwriting other providers.
- **Batch scaffolding:** Allow multiple features, contexts, pages to be generated in a single call.

## 5. Testability / Validation

- **Dry-run mode:** `--dry` prints intended changes without modifying files.
- **Validation hooks:** Check after scaffold that:

  - Imports exist
  - JSX compiles
  - Providers are correctly wrapped

## 6. Integration Helpers

- **Programmatic API:** Expose functions for direct import by Claude CLI.
- **Logging / machine-readable outputs:** `run_commands` should produce structured results.
- **Optional SQLite/JSON DB:** Track state of projects, generated features, contexts, and edits for multi-project planning.

---

_This roadmap is intended as a guide for iterative development of the MCP library, with a focus on LLM consumption and automation._
