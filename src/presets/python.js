'use strict';

module.exports = {
  name: 'Python',
  description: 'Modern Python 3.10+ with type hints, async patterns, and project best practices',
  rules: `## Python Core Principles

- Target Python 3.10+ minimum. Use modern syntax: match statements, union types (X | Y), etc.
- Use type hints on all function signatures. Use \`from __future__ import annotations\` for forward refs.
- Follow PEP 8 style guide. Use a formatter (Black or Ruff) and linter (Ruff) — never argue about style.
- Use f-strings for string formatting. Never use % formatting or .format() for new code.
- Prefer pathlib.Path over os.path for all path operations.

## Type Hints

- Type all function parameters and return values: \`def get_user(user_id: int) -> User | None:\`
- Use \`list[str]\`, \`dict[str, int]\`, \`tuple[int, ...]\` (lowercase, not typing.List, etc.) in 3.10+.
- Use \`TypeAlias\` for complex types: \`JsonDict: TypeAlias = dict[str, Any]\`
- Use \`Protocol\` for structural typing (duck typing with type safety).
- Use \`TypeVar\` and \`Generic\` for generic functions/classes.
- Use \`Literal\` for restricted string/int values: \`mode: Literal['read', 'write']\`
- Use \`TypeGuard\` for custom type narrowing functions.
- Avoid \`Any\` — use \`object\` or specific types. \`Any\` disables type checking entirely.

## Project Structure

- Use \`pyproject.toml\` as the single project config file. No setup.py, setup.cfg in new projects.
- Use \`src/\` layout: \`src/mypackage/\` for the package, tests/ at the root.
- Use \`__init__.py\` to define public APIs. Explicitly import and re-export public names.
- Virtual environments are mandatory. Use \`venv\`, \`uv\`, or \`poetry\` — never install globally.

## Error Handling

- Catch specific exceptions, never bare \`except:\` or \`except Exception:\` without re-raising.
- Create custom exception hierarchies for your domain: \`class UserNotFoundError(AppError):\`
- Use \`raise ... from original_error\` for exception chaining.
- Use context managers (\`with\` statement) for resource management.
- Log exceptions with full tracebacks: \`logger.exception("Failed to process")\`
- Return None or raise — don't return error strings or sentinel values.

## Functions & Classes

- Functions should do one thing. Keep them under 30 lines.
- Use dataclasses or Pydantic models for data containers, not plain dicts.
- Use \`@dataclass(frozen=True)\` for immutable data. Use \`@dataclass(slots=True)\` for memory efficiency.
- Prefer composition over inheritance. Use Protocols for interface contracts.
- Use \`@staticmethod\` only for utility functions that don't need class/instance. Prefer module-level functions.
- Use \`@classmethod\` for alternative constructors: \`User.from_dict(data)\`.
- Use \`__str__\` for human-readable representation, \`__repr__\` for debugging.

## Async Programming

- Use \`async/await\` for I/O-bound operations (network, file, database).
- Use \`asyncio.gather()\` for concurrent async operations.
- Use \`asyncio.TaskGroup\` (3.11+) for structured concurrency.
- Use \`async with\` for async context managers (database connections, HTTP sessions).
- Use \`async for\` for async iterators (streaming responses, database cursors).
- Don't mix sync and async code carelessly — use \`asyncio.to_thread()\` for sync-in-async.

## Testing

- Use pytest as the test framework. Never unittest for new code.
- Name test files \`test_*.py\`, test functions \`test_*\`.
- Use fixtures for setup/teardown. Prefer function-scoped fixtures.
- Use \`pytest.mark.parametrize\` for testing multiple inputs.
- Use \`pytest-asyncio\` for async tests.
- Mock external services, not internal implementation. Use \`pytest-mock\` or \`unittest.mock\`.
- Aim for meaningful tests: test behavior and edge cases, not line coverage.

## Dependency Management

- Use \`uv\` (fastest) or \`poetry\` for dependency management.
- Pin dependencies in \`pyproject.toml\` or requirements files.
- Separate dev dependencies from production dependencies.
- Use dependency groups: [project.optional-dependencies] for extras.
- Run \`pip audit\` or \`safety check\` regularly for vulnerabilities.

## Logging

- Use the \`logging\` module, never \`print()\` for production code.
- Configure logging at application entry point, not in library code.
- Use structured logging (structlog or python-json-logger) for production.
- Use appropriate levels: DEBUG for details, INFO for events, WARNING for concerns, ERROR for failures.
- Include context in log messages: user ID, request ID, operation name.

## Configuration

- Use environment variables for deployment config. Use pydantic-settings or environs for parsing.
- Use \`.env\` files for local development only.
- Validate config at startup — fail fast on missing/invalid config.
- Use sensible defaults for development, require explicit values for production.

## Code Quality

- Use Ruff for both linting and formatting (replaces Black, isort, flake8, pylint).
- Use mypy or pyright for type checking in CI.
- Use pre-commit hooks for automated code quality checks.
- Write docstrings for public functions and classes (Google or NumPy style).
- Use \`assert\` only in tests, never for runtime validation.
`,
};
