'use strict';

module.exports = {
  name: 'TypeScript',
  description: 'TypeScript strict mode, advanced patterns, and type safety best practices',
  rules: `## TypeScript Core Principles

- Enable strict mode in tsconfig.json. All strict flags should be true.
- Never use \`any\`. Use \`unknown\` for truly unknown values, then narrow with type guards.
- Prefer \`interface\` for object shapes that may be extended. Use \`type\` for unions, intersections, and computed types.
- Export types alongside their implementations. Co-locate types with the code that uses them.
- Use explicit return types on exported functions. Let inference work for internal/private functions.

## Type Design

- Model your domain with discriminated unions, not optional fields:
  \`type Result<T> = { success: true; data: T } | { success: false; error: Error }\`
- Use branded types for IDs and special strings: \`type UserId = string & { readonly __brand: 'UserId' }\`
- Prefer \`readonly\` arrays and properties by default. Only make mutable when needed.
- Use \`as const\` for literal types: \`const ROLES = ['admin', 'user'] as const\`
- Template literal types for string patterns: \`type EventName = \`on\${Capitalize<string>}\`\`
- Avoid enum — use \`as const\` objects or union types instead: \`type Direction = 'north' | 'south' | 'east' | 'west'\`

## Type Guards & Narrowing

- Write custom type guards for complex types: \`function isUser(x: unknown): x is User\`
- Use \`satisfies\` operator to validate types without widening: \`const config = { ... } satisfies Config\`
- Prefer \`in\` operator for discriminated unions: \`if ('error' in result)\`
- Use \`instanceof\` for class instances, \`typeof\` for primitives.
- Exhaustive checks with \`never\`: ensure switch statements handle all cases.

## Generics

- Name generic parameters descriptively: \`<TItem>\`, \`<TInput, TOutput>\`, not just \`<T>\`.
- Constrain generics: \`<T extends Record<string, unknown>>\`, not bare \`<T>\`.
- Use default generic parameters when there's a sensible default: \`<T = string>\`.
- Avoid more than 3 generic parameters — it's a sign of over-abstraction.
- Use \`infer\` in conditional types for extracting nested types.

## Functions

- Prefer function declarations for top-level functions (hoisting + readability).
- Use arrow functions for callbacks and inline functions.
- Use overloads when a function has genuinely different input/output type relationships.
- Avoid optional parameters beyond 2. Use an options object instead.
- Type callbacks explicitly: \`(item: Item, index: number) => boolean\`, not \`Function\`.

## Null Handling

- Enable \`strictNullChecks\` (included in strict mode).
- Use optional chaining (\`?.\`) and nullish coalescing (\`??\`) over manual null checks.
- Prefer \`undefined\` over \`null\` for "no value" in your own code. Match library conventions when wrapping.
- Avoid non-null assertion (\`!\`) except in tests or when you've just checked existence.
- Use \`Required<T>\` and \`Partial<T>\` utilities to transform optionality.

## Error Handling

- Define custom error types: \`class ValidationError extends Error { constructor(public field: string, message: string) { super(message); } }\`
- Use Result types instead of throwing for expected failures.
- Catch \`unknown\` errors (TS 4.4+) and narrow before accessing properties.
- Type your error responses: don't let error shapes be ad-hoc.
- Use \`Error.cause\` for error chaining in Node 16+.

## Utility Types

- Know and use built-in utilities: \`Partial\`, \`Required\`, \`Pick\`, \`Omit\`, \`Record\`, \`Exclude\`, \`Extract\`, \`NonNullable\`, \`ReturnType\`, \`Parameters\`, \`Awaited\`.
- Create project-specific utilities for repeated type patterns.
- Use \`Readonly<T>\` for immutable data structures.
- \`Record<string, never>\` for empty objects, not \`{}\`.
- \`Awaited<ReturnType<typeof fn>>\` to get the resolved type of async functions.

## Module Organization

- Use path aliases in tsconfig: \`"@/*": ["./src/*"]\` for cleaner imports.
- Prefer named exports. Default exports make refactoring harder.
- Re-export public APIs from index.ts barrel files at module boundaries only.
- Keep circular dependencies at zero — they cause hard-to-debug issues.

## tsconfig Best Practices

- \`"strict": true\` — non-negotiable.
- \`"noUncheckedIndexedAccess": true\` — catches array/object indexing bugs.
- \`"exactOptionalPropertyTypes": true\` — distinguishes \`undefined\` from missing.
- \`"noFallthroughCasesInSwitch": true\` — prevents switch statement bugs.
- \`"forceConsistentCasingInFileNames": true\` — prevents cross-platform issues.
- \`"moduleResolution": "bundler"\` for modern projects.
- Target ES2022+ unless you need to support older runtimes.

## Async Patterns

- Always use async/await over raw Promises for readability.
- Type async functions: \`async function getUser(id: string): Promise<User | null>\`
- Use \`Promise.all()\` for independent concurrent operations.
- Use \`Promise.allSettled()\` when you need all results regardless of individual failures.
- Avoid \`Promise\` constructor unless wrapping callback APIs — most things are already async.

## Testing with TypeScript

- Use \`as\` assertions sparingly in tests — prefer building complete objects.
- Create test factories: \`function createUser(overrides?: Partial<User>): User\`
- Type your test helpers and fixtures.
- Mock types should match implementation types — don't \`as any\` your mocks.
`,
};
