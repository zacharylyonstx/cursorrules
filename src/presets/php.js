'use strict';

module.exports = {
  name: 'PHP',
  description: 'Modern PHP 8.2+ with strict typing, patterns, and Composer best practices',
  rules: `## PHP Core Principles

- Use PHP 8.2+ features: enums, readonly properties, fibers, intersection types, named arguments.
- Always declare strict_types: \`declare(strict_types=1);\` at the top of every file.
- Use typed properties, parameters, and return types. Avoid mixed type.
- Follow PSR-12 coding style. Use PHP-CS-Fixer or PHP_CodeSniffer for enforcement.
- Use Composer for all dependency management. Autoload with PSR-4.

## Type System

- Use union types: \`string|int\`, intersection types: \`Countable&Iterator\`.
- Use enums for fixed sets of values: \`enum Status: string { case Active = 'active'; }\`
- Use readonly properties and readonly classes for immutable data.
- Use named arguments for clarity: \`new User(name: 'Alice', email: 'alice@test.com')\`
- Use match expressions over switch for value returns.
- Use null safe operator: \`$user?->getAddress()?->getCity()\`
- Use first-class callable syntax: \`array_map($this->transform(...), $items)\`

## Error Handling

- Use exceptions for exceptional situations. Create custom exception classes.
- Use try-catch at application boundaries (controllers, commands, event handlers).
- Define exception hierarchy: AppException → ValidationException, NotFoundException.
- Log exceptions with context. Use structured logging (Monolog).
- Never use @ error suppression operator.
- Return Result objects for expected failures in domain logic.

## Classes & Objects

- One class per file. PSR-4 autoloading structure.
- Use constructor promotion: \`public function __construct(private readonly string $name)\`
- Use interfaces for contracts. Program to interfaces, not implementations.
- Use traits sparingly — prefer composition with dependency injection.
- Use final by default on classes. Only remove final when inheritance is intentional.
- Use value objects for domain concepts: Money, Email, UserId.

## Database (PDO / ORM)

- Always use prepared statements with parameterized queries.
- Use Doctrine ORM or Eloquent for complex data models.
- Use migrations for all schema changes.
- Use repository pattern for data access abstraction.
- Use transactions for multi-step operations.
- Use query builders over raw SQL for dynamic queries.

## Testing

- Use PHPUnit or Pest for testing.
- Test structure: Arrange-Act-Assert.
- Use data providers for testing multiple inputs.
- Mock external dependencies with Mockery or PHPUnit mocks.
- Use factories for test data generation.
- Test at the behavior level, not implementation level.
- Aim for meaningful test coverage over line coverage.

## Security

- Validate and sanitize ALL user input.
- Use prepared statements for ALL database queries.
- Use password_hash() and password_verify() for passwords.
- Set secure session configuration: httponly, secure, samesite cookies.
- Use CSRF tokens for all form submissions.
- Escape output: htmlspecialchars() for HTML, json_encode() for JSON.
- Keep dependencies updated: \`composer audit\`.

## Composer & Dependencies

- Use composer.lock in version control.
- Separate require from require-dev.
- Use exact version constraints or ^ for flexibility.
- Run \`composer audit\` regularly for security vulnerabilities.
- Use autoload-dev for test classes.

## Project Structure

- \`/src\` — Application source code (PSR-4 root)
- \`/tests\` — Test files mirroring src structure
- \`/config\` — Configuration files
- \`/public\` — Web root (index.php)
- \`/resources\` — Templates, assets
- \`/database/migrations\` — Schema migrations
- \`/storage\` — Generated files, logs, cache
- \`/vendor\` — Composer dependencies (gitignored)
`,
};
