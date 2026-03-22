'use strict';

module.exports = {
  name: 'Go',
  description: 'Go idioms, error handling, concurrency, and project structure best practices',
  rules: `## Go Core Principles

- Write idiomatic Go. Follow Effective Go and the Go Code Review Comments wiki.
- Simplicity over cleverness. Go code should be boring and readable.
- Use \`go fmt\` (or \`gofumpt\`) — formatting is not a discussion in Go.
- Use \`go vet\`, \`staticcheck\`, and \`golangci-lint\` for catching bugs and style issues.
- Use the latest stable Go version. Specify in go.mod: \`go 1.22\`

## Error Handling

- Always check errors. Never ignore returned errors with \`_\`.
- Return errors, don't panic. Panic is for truly unrecoverable situations only.
- Wrap errors with context: \`fmt.Errorf("failed to get user %d: %w", id, err)\`
- Use \`errors.Is()\` and \`errors.As()\` for error checking, not string matching.
- Define sentinel errors: \`var ErrNotFound = errors.New("not found")\`
- Create custom error types for errors that carry structured information.
- Handle errors at the appropriate level — don't handle an error then return it.
- Use the \`%w\` verb for wrapping (allows unwrapping), \`%v\` for formatting without chain.

## Naming Conventions

- Use short, descriptive names. \`user\` not \`currentUser\`, \`i\` not \`index\` in short loops.
- Exported names: PascalCase. Unexported: camelCase.
- Interfaces: name by method + "-er" suffix: \`Reader\`, \`Writer\`, \`Stringer\`, \`Handler\`.
- Single-method interfaces are preferred. Compose larger interfaces from small ones.
- Avoid stuttering: \`user.New()\` not \`user.NewUser()\`. Package name provides context.
- Acronyms are all caps: \`HTTPClient\`, \`userID\`, \`xmlParser\`.
- Package names: short, lowercase, single word. No underscores or mixedCaps.

## Structs & Interfaces

- Accept interfaces, return structs. This keeps APIs flexible for callers.
- Keep interfaces small — 1-3 methods. The bigger the interface, the weaker the abstraction.
- Define interfaces where they're used, not where they're implemented.
- Use struct embedding for composition, not inheritance simulation.
- Use constructor functions: \`func NewServer(cfg Config) *Server\`
- Use functional options pattern for complex constructors: \`func WithTimeout(d time.Duration) Option\`
- Export struct fields only if external packages need them.

## Concurrency

- Don't start goroutines without knowing when they'll stop.
- Use \`context.Context\` as the first parameter for cancellation and timeouts.
- Use \`errgroup.Group\` for managing groups of goroutines with error handling.
- Use channels for communication, mutexes for state protection.
- Prefer \`sync.Mutex\` over channels for simple state protection.
- Use \`sync.Once\` for one-time initialization.
- Use \`sync.WaitGroup\` when you don't need error handling from goroutines.
- Never close a channel from the receiver side. Only the sender closes.
- Use buffered channels when the producer/consumer rates are different.
- Avoid goroutine leaks: always provide a way for goroutines to exit.

## Functions

- Keep functions short and focused. If over 40 lines, consider splitting.
- Return early on errors — avoid deep nesting.
- Group related functionality into methods on a type.
- Use named return values only when they improve documentation. Don't use bare returns.
- Variadic parameters are fine for truly optional values: \`func Log(msg string, args ...any)\`
- Use value receivers for small, immutable types. Pointer receivers for large or mutable types.

## Testing

- Use table-driven tests for testing multiple cases.
- Name test cases descriptively: \`{name: "empty input returns error"}\`
- Use \`testify/assert\` or \`testify/require\` for cleaner assertions (optional but common).
- Use \`t.Helper()\` in test helper functions so failures report the correct line.
- Use \`t.Parallel()\` for tests that can run concurrently.
- Use \`httptest.NewServer()\` for testing HTTP handlers.
- Put test fixtures in \`testdata/\` directories.
- Use \`_test.go\` suffix. Tests in the same package for white-box, \`_test\` package for black-box.

## Project Structure (Standard Layout)

- \`/cmd/appname/\` — Main application entry points
- \`/internal/\` — Private application code (Go enforces this)
- \`/pkg/\` — Public library code (optional, use sparingly)
- \`/api/\` — API definitions (OpenAPI specs, proto files)
- \`/configs/\` — Configuration files and templates
- \`/scripts/\` — Build and CI scripts
- \`/docs/\` — Documentation
- Don't create \`/src\` — that's not Go convention.

## Database

- Use \`database/sql\` with a driver, or sqlx for slightly more convenience.
- Always use parameterized queries. Never concatenate SQL strings.
- Use context-aware query functions: \`db.QueryContext(ctx, ...)\`
- Close rows after iteration: \`defer rows.Close()\`
- Use connection pooling: set \`MaxOpenConns\`, \`MaxIdleConns\`, \`ConnMaxLifetime\`.
- Use migrations (golang-migrate, goose) for schema changes.

## HTTP

- Use \`net/http\` for most things. It's more capable than people think.
- Use \`http.NewServeMux()\` with pattern matching (Go 1.22+): \`mux.HandleFunc("GET /users/{id}", handler)\`
- Set timeouts on \`http.Server\`: ReadTimeout, WriteTimeout, IdleTimeout.
- Use middleware pattern for cross-cutting concerns: logging, auth, CORS.
- Use \`context.Context\` from requests for cancellation propagation.

## Configuration

- Use environment variables for 12-factor app configuration.
- Parse with \`os.Getenv()\` or a library like \`envconfig\`, \`viper\`.
- Validate config at startup. Fail fast on missing required config.
- Use typed config structs, not raw string maps.
`,
};
