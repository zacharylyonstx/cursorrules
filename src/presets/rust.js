'use strict';

module.exports = {
  name: 'Rust',
  description: 'Rust ownership, error handling, async patterns, and idiomatic code',
  rules: `## Rust Core Principles

- Embrace the borrow checker — fight it less, design with it more.
- Use \`cargo clippy\` and \`cargo fmt\` on every save. No exceptions.
- Prefer safe code. Use \`unsafe\` only when absolutely necessary, document why, and minimize scope.
- Use the latest stable Rust edition. Set \`edition = "2021"\` (or later) in Cargo.toml.
- Read compiler errors carefully — Rust errors are some of the best in any language.

## Ownership & Borrowing

- Default to owned types in structs. Use references only when lifetime management is clear.
- Prefer \`&str\` over \`String\` in function parameters (accepts both).
- Prefer \`&[T]\` over \`Vec<T>\` in function parameters (accepts arrays, vectors, slices).
- Use \`Clone\` sparingly and intentionally. Don't clone to silence the borrow checker.
- Use \`Cow<'_, str>\` when you sometimes need to own and sometimes borrow.
- Prefer moving data over reference counting. Use \`Arc\` and \`Rc\` when shared ownership is genuinely needed.

## Error Handling

- Use \`Result<T, E>\` for recoverable errors. Never panic for expected failures.
- Define custom error enums with \`thiserror\`: \`#[derive(Debug, thiserror::Error)]\`
- Use \`anyhow::Result\` in application code for easy error propagation.
- Use \`thiserror\` in library code for typed, specific error variants.
- Use \`?\` operator for error propagation. Avoid \`.unwrap()\` except in tests and prototyping.
- Use \`.expect("reason")\` over \`.unwrap()\` when you must unwrap — document why it's safe.
- Map errors at boundaries: convert library errors to your domain errors.

## Types & Traits

- Use newtype pattern for domain types: \`struct UserId(u64);\` — prevents mixing IDs.
- Implement standard traits: \`Debug\`, \`Clone\`, \`PartialEq\` on most types. Derive when possible.
- Use \`#[derive(Debug, Clone, PartialEq, Eq, Hash)]\` — derive what you need.
- Prefer generics with trait bounds over trait objects: \`fn process<T: Display>(item: T)\`
- Use \`impl Trait\` in return position for zero-cost abstractions.
- Use \`dyn Trait\` (trait objects) when you need runtime polymorphism.
- Use \`From/Into\` traits for type conversions. Implement \`From\`, use \`Into\` in bounds.

## Enums & Pattern Matching

- Use enums for state machines and variants — Rust enums are algebraic data types.
- Always match exhaustively. No \`_ => {}\` catch-all unless truly appropriate.
- Use \`if let\` for single-variant matching: \`if let Some(value) = optional { ... }\`
- Use \`let else\` for early returns: \`let Some(value) = optional else { return Err(...) };\`
- Enums with data are more idiomatic than separate struct + boolean flags.

## Async Rust

- Use \`tokio\` runtime for async applications (or \`async-std\` if project prefers).
- Use \`async fn\` and \`.await\` — avoid manual Future implementations.
- Use \`tokio::spawn\` for concurrent tasks. Use \`tokio::select!\` for racing futures.
- Use \`tokio::sync::Mutex\` (not std::sync::Mutex) in async code.
- Use channels (\`mpsc\`, \`oneshot\`, \`broadcast\`) for async communication.
- Pin futures when needed: \`Box::pin()\` or \`tokio::pin!\`.
- Avoid blocking the async runtime — use \`tokio::task::spawn_blocking\` for CPU-bound work.

## Structs & Modules

- Use the builder pattern for complex struct construction.
- Implement \`Default\` when a sensible default exists.
- Use \`pub(crate)\` for crate-internal visibility instead of making everything \`pub\`.
- Organize with modules: \`mod.rs\` or \`module_name.rs\` + \`module_name/\` directory.
- Re-export public API items in \`lib.rs\`: \`pub use crate::module::ImportantType;\`

## Iterators & Functional Patterns

- Prefer iterator chains over manual loops: \`.iter().filter().map().collect()\`
- Use \`.collect::<Vec<_>>()\` with turbofish for type inference.
- Use \`.enumerate()\` for index + value iteration.
- Use \`.flat_map()\` to flatten nested iterators.
- Use \`.partition()\`, \`.fold()\`, \`.scan()\` for complex transformations.
- Implement \`Iterator\` trait for custom iterators.

## Testing

- Unit tests go in the same file: \`#[cfg(test)] mod tests { ... }\`
- Integration tests go in \`/tests\` directory.
- Use \`#[test]\` for sync tests, \`#[tokio::test]\` for async tests.
- Use \`assert_eq!\`, \`assert_ne!\`, \`assert!\` with descriptive messages.
- Use \`#[should_panic(expected = "...")]\` for testing panic conditions.
- Use \`proptest\` or \`quickcheck\` for property-based testing.
- Use test fixtures with \`once_cell\` or \`lazy_static\` for expensive setup.

## Performance

- Profile before optimizing. Use \`cargo flamegraph\`, \`perf\`, or \`criterion\` for benchmarks.
- Use \`&str\` and slices to avoid unnecessary allocations.
- Use \`SmallVec\` for vectors that are usually small.
- Use \`Box\` to put large types on the heap and reduce stack size.
- Prefer \`Vec\` over \`LinkedList\` — cache locality matters.
- Use \`#[inline]\` sparingly and only with benchmark evidence.

## Cargo & Dependencies

- Use workspace features for multi-crate projects.
- Minimize dependencies. Check with \`cargo tree\`.
- Use feature flags for optional functionality.
- Run \`cargo audit\` for security vulnerabilities.
- Use \`cargo doc --open\` to preview documentation.
`,
};
