'use strict';

module.exports = {
  name: 'Node.js',
  description: 'Node.js server-side development, async patterns, and project structure',
  rules: `## Node.js Core Principles

- Use the latest LTS version of Node.js. Specify the engine in package.json.
- Always use \`'use strict'\` at the top of CommonJS files. ESM is strict by default.
- Prefer ESM (import/export) for new projects. Use .mjs extension or "type": "module" in package.json.
- Handle process signals gracefully: SIGTERM, SIGINT for clean shutdown.
- Set \`process.exitCode\` instead of calling \`process.exit()\` directly — allow cleanup to complete.

## Async Patterns

- Use async/await everywhere. Avoid callback-style APIs — use \`util.promisify()\` to wrap them.
- Always handle Promise rejections. Unhandled rejections crash the process in Node 15+.
- Use \`AbortController\` and \`AbortSignal\` for cancellation of async operations.
- Use \`Promise.all()\` for concurrent independent operations, \`Promise.allSettled()\` when partial failure is acceptable.
- Implement retry logic with exponential backoff for network operations.
- Use async iterators and \`for await...of\` for streaming data.

## Error Handling

- Create custom error classes extending Error with meaningful names and properties.
- Include error codes (not just messages) for programmatic error handling.
- Use structured error responses: \`{ code: 'USER_NOT_FOUND', message: '...', details: {} }\`
- Centralize error handling in Express/Fastify error middleware.
- Log errors with full context: stack trace, request ID, user context, input that caused the error.
- Never swallow errors silently. At minimum, log them.
- Use \`Error.cause\` for error chaining: \`throw new AppError('Failed to fetch user', { cause: originalError })\`

## Security

- Never trust user input. Validate and sanitize everything from requests.
- Use parameterized queries for all database operations — never string concatenation.
- Set security headers: helmet for Express, @fastify/helmet for Fastify.
- Rate limit API endpoints. Use express-rate-limit or similar.
- Store secrets in environment variables, never in code. Validate env vars at startup.
- Use crypto.timingSafeEqual() for comparing secrets to prevent timing attacks.
- Run with least privilege. Don't run as root.

## File System

- Use \`fs.promises\` (or \`fs/promises\`) for all file operations.
- Use \`path.join()\` and \`path.resolve()\` for all path construction — never string concatenation.
- Handle ENOENT errors explicitly for missing files.
- Use \`fs.createReadStream()\` and \`fs.createWriteStream()\` for large files.
- Use \`os.tmpdir()\` for temporary files, clean them up.

## Modules & Dependencies

- Pin exact versions in package.json or use a lockfile (package-lock.json).
- Audit dependencies regularly: \`npm audit\`.
- Minimize dependencies. Prefer Node.js built-ins when sufficient.
- Use \`node:\` prefix for built-in modules: \`import fs from 'node:fs'\`.
- Check bundle size and dependency tree before adding new packages.

## Environment Configuration

- Use dotenv for local development only. In production, use real env vars.
- Validate all environment variables at startup with a schema (Zod, Joi, or envalid).
- Provide sensible defaults for non-sensitive config.
- Use different config for different environments: development, test, staging, production.
- Never log sensitive environment variables.

## Logging

- Use a structured logging library: pino, winston, or bunyan.
- Log in JSON format for machine parseability.
- Include correlation IDs (request ID) in all log entries.
- Use appropriate log levels: error (failures), warn (concerning), info (important events), debug (details).
- Never log sensitive data: passwords, tokens, PII.
- Log at the boundary: incoming requests, outgoing responses, external service calls.

## Testing

- Use a modern test runner: Node.js built-in test runner (node --test), Vitest, or Jest.
- Structure tests with describe/it blocks and clear test names.
- Test the public API of modules, not internal implementation.
- Use fixtures and factories for test data.
- Mock external services at the HTTP level (MSW, nock) not at the module level.
- Aim for meaningful coverage, not 100% line coverage.

## Process Management

- Implement graceful shutdown: close server, drain connections, flush logs, close DB connections.
- Use health check endpoints for load balancers and orchestrators.
- Handle uncaught exceptions and unhandled rejections: log and exit (don't try to recover).
- Use cluster module or PM2 for multi-core utilization in production.
- Implement readiness and liveness probes for Kubernetes deployments.

## Project Structure

- \`/src\` — Application source code
- \`/src/routes\` or \`/src/controllers\` — Request handlers
- \`/src/services\` — Business logic
- \`/src/models\` — Data models / database schemas
- \`/src/middleware\` — Express/Fastify middleware
- \`/src/utils\` — Utility functions
- \`/src/config\` — Configuration loading and validation
- \`/tests\` — Test files mirroring src structure
- \`/scripts\` — Build, migration, and utility scripts
`,
};
