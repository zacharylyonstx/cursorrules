'use strict';

module.exports = {
  name: 'Testing',
  description: 'Testing best practices across unit, integration, and E2E testing',
  rules: `## Testing Philosophy

- Write tests that give confidence to deploy. Focus on behavior, not implementation.
- Test the public API of modules. If refactoring internals doesn't break tests, they're good tests.
- Each test should test one thing. The test name should describe what it verifies.
- Tests are documentation. Someone should understand behavior by reading test names alone.
- Prefer fewer meaningful tests over many shallow tests. 80% meaningful coverage > 100% line coverage.
- Test the diamond, not the pyramid: emphasize integration tests that cover real interactions.

## Test Structure

- Follow Arrange-Act-Assert (AAA) pattern. Separate these sections with blank lines.
- Use descriptive test names: "should return 404 when user does not exist" not "test user API".
- Group related tests with describe blocks. Nest for sub-behaviors.
- One assertion per test (or one logical assertion — multiple expects on the same result is fine).
- Keep tests independent. No shared mutable state between tests. Each test sets up its own state.
- Tests should run in any order and pass in isolation.

## Test Data

- Use factories or builders for test data: \`createUser({ name: 'Alice' })\`
- Provide sensible defaults in factories. Override only what matters for each test.
- Use realistic but deterministic data. Avoid random data in tests (flaky).
- Don't share test data between tests. Each test creates what it needs.
- Use constants for magic values: \`const VALID_EMAIL = 'test@example.com'\`

## Mocking

- Mock at the boundary: external services, databases, file system, time.
- Don't mock what you own — test the real implementation.
- Use fakes (in-memory implementations) over mocks when possible.
- Mock at the HTTP level (MSW, nock) rather than the module level for API calls.
- Reset mocks between tests. Lingering mock state causes flaky tests.
- If you need to mock too many things, your code is too coupled — refactor instead.

## Unit Testing

- Unit tests should be fast: under 10ms per test. No I/O, no network, no database.
- Test pure functions exhaustively: happy path, edge cases, error cases.
- Test boundary conditions: empty arrays, null/undefined, zero, negative numbers, max values.
- Test error paths: invalid inputs should produce clear errors.
- Use parameterized tests for multiple inputs with the same behavior.

## Integration Testing

- Integration tests verify that modules work together correctly.
- Test database operations against a real database (in-memory or test instance).
- Test API endpoints end-to-end: request → response, including middleware.
- Use test transactions: start a transaction before each test, rollback after.
- Test authentication and authorization flows as integration tests.
- Test external service integrations with contract tests or recorded responses.

## E2E Testing

- Use Playwright or Cypress for browser E2E tests.
- Test critical user journeys: signup, login, core feature workflow, payment.
- Keep E2E tests minimal — they're slow and brittle. Cover happy paths.
- Use stable selectors: data-testid, ARIA roles, visible text — not CSS classes.
- Wait for elements properly: use built-in waiting mechanisms, never sleep().
- Run E2E tests in CI against a production-like environment.
- Use visual regression testing (Percy, Chromatic) for UI-heavy applications.

## API Testing

- Test each endpoint: success response, validation errors, auth errors, not found.
- Verify response shape and types, not just status codes.
- Test pagination, filtering, and sorting.
- Test rate limiting and error handling.
- Use snapshot testing for complex response structures (but maintain snapshots).
- Test webhook handling with mock webhook payloads.

## Test Performance

- Unit tests: < 10ms each. Total suite: < 30 seconds.
- Integration tests: < 1 second each. Total suite: < 5 minutes.
- E2E tests: < 30 seconds each. Total suite: < 15 minutes.
- Run tests in parallel when possible. Ensure test isolation.
- Use --bail flag to stop on first failure during development.
- Use --changed or --watch for running only affected tests during development.

## CI/CD Testing

- Run all tests in CI on every pull request.
- Run unit + integration tests on every push. E2E tests on PR and main branch.
- Fail the build on any test failure. No exceptions.
- Report test coverage but don't enforce rigid thresholds — focus on quality.
- Cache test dependencies for faster CI runs.
- Use test sharding for parallel CI execution of large test suites.

## Testing Anti-Patterns (Avoid These)

- Testing implementation details (private methods, internal state).
- Excessive mocking that makes tests pass even when code is broken.
- Flaky tests: fix or delete them. Never mark tests as "allowed to fail".
- Testing framework/library code instead of your code.
- Large test setup that obscures what's being tested.
- Asserting on error messages (brittle) instead of error types or codes.
- Testing getters/setters or trivial code that can't meaningfully break.
`,
};
