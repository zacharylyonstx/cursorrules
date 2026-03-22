'use strict';

module.exports = {
  name: 'Monorepo',
  description: 'Monorepo patterns with Turborepo, Nx, pnpm workspaces, and shared packages',
  rules: `## Monorepo Architecture

- Use a build system: Turborepo (simple), Nx (full-featured), or Lerna (legacy).
- Use pnpm workspaces or npm workspaces for package management.
- Each package should have a clear purpose and minimal dependencies on other packages.
- Shared packages should have well-defined public APIs. Use barrel exports (index.ts).
- Version packages independently (recommended) or together based on your release strategy.

## Package Organization

- \`/apps\` — Deployable applications (web, api, mobile)
- \`/packages\` — Shared libraries and packages
- \`/packages/ui\` — Shared component library
- \`/packages/config\` — Shared configuration (ESLint, TypeScript, Prettier)
- \`/packages/utils\` — Shared utility functions
- \`/packages/types\` — Shared TypeScript types
- \`/tooling\` — Build tools, scripts, and CI configuration

## Dependency Management

- Hoist shared dependencies to the root. Package-specific deps stay local.
- Use workspace protocol for internal dependencies: \`"@myorg/ui": "workspace:*"\`
- Keep consistent versions of shared dependencies across packages.
- Use \`pnpm dedupe\` or equivalent to reduce duplicate installations.
- Run \`pnpm --filter <package>\` to scope commands to specific packages.

## Build & Task Pipeline

- Configure task dependencies in turbo.json or nx.json: build depends on ^build (upstream builds first).
- Cache build outputs: Turborepo and Nx both support local and remote caching.
- Use incremental builds: only rebuild changed packages and their dependents.
- Define clear scripts in each package: build, test, lint, typecheck.
- Use \`turbo run build --filter=app...\` to build an app and its dependencies.

## TypeScript Configuration

- Share base tsconfig from a config package: \`packages/config/tsconfig.base.json\`
- Each package extends the base: \`"extends": "@myorg/config/tsconfig.base.json"\`
- Use project references for incremental compilation.
- Use path aliases consistently: \`@myorg/ui\`, \`@myorg/utils\`.

## Code Sharing

- Extract shared code when 2+ packages use it. Don't share prematurely.
- Shared packages should be independently testable and buildable.
- Use TypeScript path aliases for clean imports across packages.
- Keep package boundaries clear: no reaching into internal modules of other packages.
- Use changesets for managing changelogs and versioning.

## CI/CD

- Run affected tests only: \`turbo run test --filter=...[HEAD~1]\`
- Use remote caching (Turborepo Remote Cache, Nx Cloud) for CI speed.
- Deploy apps independently — each app has its own deploy pipeline.
- Use GitHub Actions matrix for parallel package testing.
- Cache node_modules and build artifacts between CI runs.

## Testing

- Each package has its own test suite.
- Shared test utilities live in a dedicated test-utils package.
- Run all tests: \`turbo run test\`. Run specific: \`turbo run test --filter=@myorg/ui\`.
- Integration tests that cross package boundaries live in the consuming app.

## Common Pitfalls

- Don't create packages for everything. Extract when there's genuine reuse.
- Don't create circular dependencies between packages.
- Don't let packages depend on the internal structure of other packages.
- Keep shared config packages simple — they tend to become maintenance burdens.
- Don't over-abstract: it's a monorepo, not a framework.
`,
};
