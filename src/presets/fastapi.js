'use strict';

module.exports = {
  name: 'FastAPI',
  description: 'FastAPI with Pydantic v2, async patterns, dependency injection, and API design',
  rules: `## FastAPI Architecture

- Use async endpoints for all I/O-bound operations (database, HTTP calls, file ops).
- Use sync endpoints only for CPU-bound operations that don't benefit from async.
- Organize with routers: one APIRouter per resource domain (users, posts, auth).
- Use dependency injection for shared logic: database sessions, auth, pagination.
- Use lifespan context manager for startup/shutdown events (not on_event decorators).

## Pydantic Models (v2)

- Use Pydantic v2 with model_config instead of class Config.
- Separate request and response models: UserCreate (input), UserResponse (output).
- Use Field() for validation: \`name: str = Field(min_length=1, max_length=100)\`
- Use model_validator for cross-field validation.
- Use field_validator for single-field validation with \`@field_validator('email')\`.
- Use Annotated types for reusable validation: \`UserId = Annotated[int, Field(gt=0)]\`
- Enable strict mode for input validation: \`model_config = ConfigDict(strict=True)\`
- Never expose internal database models in API responses — always use response models.

## Endpoint Design

- Use path parameters for resource identification: \`@router.get("/users/{user_id}")\`
- Use query parameters for filtering/pagination: \`@router.get("/users")\`
- Use request body (Pydantic model) for POST/PUT/PATCH data.
- Return proper status codes: \`status_code=status.HTTP_201_CREATED\` for creation.
- Use \`response_model\` parameter to control response shape and filter sensitive fields.
- Use \`response_model_exclude_none=True\` to omit null optional fields.

## Dependency Injection

- Use \`Depends()\` for reusable logic: auth, database sessions, pagination.
- Create typed dependencies that return specific types, not Any.
- Use \`yield\` dependencies for setup/teardown (database sessions, file handles).
- Chain dependencies: a dependency can depend on other dependencies.
- Use class-based dependencies for complex stateful logic.

## Authentication & Security

- Use OAuth2PasswordBearer for JWT token auth.
- Implement token verification as a dependency: \`current_user = Depends(get_current_user)\`
- Use bcrypt or argon2 for password hashing. Never store plaintext passwords.
- Implement role-based access with dependencies: \`Depends(require_role("admin"))\`
- Use HTTPException with proper status codes for auth failures (401, 403).
- Set secure cookie options for session-based auth.

## Error Handling

- Use HTTPException for expected errors with proper status codes and detail messages.
- Create custom exception handlers for domain-specific errors.
- Use \`@app.exception_handler(CustomError)\` for global error handling.
- Return consistent error response format: \`{"detail": {"code": "...", "message": "..."}}\`
- Never expose internal error details (stack traces, DB errors) in production responses.
- Log full error context server-side for debugging.

## Database Integration

- Use SQLAlchemy 2.0 async with AsyncSession for database operations.
- Use Alembic for database migrations. Never modify schemas manually.
- Create database session dependency: \`async def get_db() -> AsyncGenerator[AsyncSession, None]\`
- Use repository pattern: separate database operations from business logic.
- Use transactions explicitly for multi-step operations.
- Implement connection pooling with appropriate pool sizes.

## Background Tasks

- Use FastAPI's BackgroundTasks for simple post-response operations.
- Use Celery or ARQ for complex, long-running background jobs.
- Use BackgroundTasks for: sending emails, logging, cleanup.
- Use Celery/ARQ for: data processing, report generation, scheduled tasks.

## Testing

- Use TestClient (or AsyncClient with httpx) for endpoint testing.
- Override dependencies in tests: \`app.dependency_overrides[get_db] = mock_db\`
- Test each endpoint: happy path, validation errors, auth failures, not found.
- Use pytest fixtures for test database setup and teardown.
- Use factory_boy or custom factories for test data.
- Test Pydantic models separately for validation logic.

## Performance

- Use async database drivers: asyncpg (PostgreSQL), aiomysql (MySQL).
- Enable response caching for read-heavy endpoints.
- Use pagination for list endpoints — never return unbounded results.
- Use select_related / joinedload for eager loading to avoid N+1 queries.
- Profile with py-spy or cProfile for bottleneck identification.

## API Documentation

- FastAPI generates OpenAPI docs automatically. Keep them accurate.
- Add docstrings to endpoints — they appear in Swagger UI.
- Use \`tags\` parameter to group endpoints in documentation.
- Add \`summary\` and \`description\` to endpoints for clarity.
- Use \`examples\` in Pydantic models for better API documentation.
- Document error responses with \`responses\` parameter.

## Project Structure

- \`/app\` — Application root
- \`/app/api/v1\` — API routes organized by domain
- \`/app/core\` — Config, security, dependencies
- \`/app/models\` — SQLAlchemy models
- \`/app/schemas\` — Pydantic schemas (request/response)
- \`/app/services\` — Business logic
- \`/app/repositories\` — Database operations
- \`/app/tests\` — Tests
- \`/migrations\` — Alembic migrations
`,
};
