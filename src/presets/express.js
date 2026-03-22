'use strict';

module.exports = {
  name: 'Express / Node API',
  description: 'Express.js, Fastify, and Node.js REST API development patterns',
  rules: `## API Architecture

- Use a layered architecture: routes → controllers → services → repositories/models.
- Controllers handle HTTP concerns (request parsing, response formatting). Services handle business logic.
- Never put business logic in route handlers or controllers directly.
- Use dependency injection for services — don't import singletons directly in controllers.
- Version your API from the start: /api/v1/users. It's much harder to add later.

## Route Design

- Use RESTful conventions: GET (read), POST (create), PUT/PATCH (update), DELETE (remove).
- Use plural nouns for resources: /users, /posts, /orders — not /user, /post.
- Nested routes for relationships: /users/:userId/posts — but limit to 2 levels deep.
- Use query parameters for filtering, sorting, pagination: /users?role=admin&sort=name&page=2.
- Return appropriate HTTP status codes: 200 (OK), 201 (Created), 204 (No Content), 400 (Bad Request), 401 (Unauthorized), 403 (Forbidden), 404 (Not Found), 409 (Conflict), 422 (Unprocessable), 500 (Server Error).

## Middleware

- Order middleware carefully: security → parsing → auth → rate limiting → routes → error handling.
- Use helmet for security headers.
- Use cors with specific origins, not wildcard (*) in production.
- Use compression for response compression.
- Implement request logging middleware (morgan, pino-http) — log method, URL, status, duration.
- Create reusable middleware for auth, validation, rate limiting.

## Request Validation

- Validate ALL incoming data: body, params, query, headers. Never trust client input.
- Use a schema validation library: Zod, Joi, or express-validator.
- Validate at the route level with middleware, before controllers execute.
- Return detailed validation errors: which field failed, why, and what's expected.
- Sanitize string inputs: trim whitespace, escape HTML if needed.
- Set maximum request body size to prevent abuse.

## Response Format

- Use consistent response envelopes across all endpoints:
  Success: \`{ "data": {...}, "meta": { "page": 1, "total": 100 } }\`
  Error: \`{ "error": { "code": "VALIDATION_ERROR", "message": "...", "details": [...] } }\`
- Use camelCase for JSON field names (JavaScript convention).
- Include pagination metadata for list endpoints.
- Use \`null\` for missing optional fields, not undefined (undefined isn't valid JSON).
- Set Content-Type headers explicitly.

## Error Handling

- Create a centralized error handling middleware (must have 4 params in Express).
- Define custom error classes: NotFoundError, ValidationError, AuthenticationError.
- Never expose stack traces or internal details in production error responses.
- Log full error details server-side including stack trace, request context, and user info.
- Handle async errors: use express-async-errors or wrap async handlers.
- Return errors as JSON with error codes, not HTML pages.

## Authentication & Authorization

- Use JWT for stateless auth or sessions for stateful auth — pick one, don't mix.
- Store JWTs in httpOnly, secure, sameSite cookies — not localStorage.
- Implement token refresh rotation to prevent token theft.
- Use middleware for auth checks. Don't repeat auth logic in every route.
- Implement role-based access control (RBAC) as middleware.
- Hash passwords with bcrypt (cost factor ≥ 12) or argon2.

## Database Patterns

- Use an ORM (Prisma, Drizzle, TypeORM) or query builder (Knex) — not raw SQL strings.
- Use migrations for all schema changes. Never modify production schemas manually.
- Use transactions for operations that modify multiple tables.
- Implement connection pooling. Set appropriate pool sizes.
- Use soft deletes (deletedAt column) for important data.
- Index columns used in WHERE, ORDER BY, and JOIN clauses.

## Rate Limiting & Security

- Rate limit all endpoints. Stricter limits on auth endpoints (login, register, password reset).
- Use express-rate-limit or a Redis-backed solution for distributed rate limiting.
- Implement request size limits on all endpoints.
- Use parameterized queries for all database operations.
- Validate content types: reject unexpected Content-Type headers.
- Set appropriate CORS headers for your client origins.

## Performance

- Use caching headers (Cache-Control, ETag) for cacheable responses.
- Implement Redis caching for expensive queries or frequently accessed data.
- Use cursor-based pagination for large datasets (more efficient than offset).
- Enable response compression (gzip/brotli).
- Use database query optimization: select only needed fields, use pagination, avoid N+1 queries.
- Implement health check endpoints: /health (basic), /ready (dependencies OK).

## Testing

- Test API endpoints with supertest (Express) or light-my-request (Fastify).
- Use separate test databases. Reset state between tests.
- Test happy paths, validation errors, auth failures, and edge cases.
- Mock external services at the HTTP level.
- Test middleware in isolation.
- Load test critical endpoints with k6 or autocannon before launch.

## Project Structure

- \`/src/routes\` — Route definitions
- \`/src/controllers\` — Request handlers
- \`/src/services\` — Business logic
- \`/src/models\` — Database models/schemas
- \`/src/middleware\` — Custom middleware
- \`/src/validators\` — Request validation schemas
- \`/src/utils\` — Utility functions
- \`/src/config\` — Configuration
- \`/src/types\` — TypeScript types
`,
};
