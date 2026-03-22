'use strict';

module.exports = {
  name: 'Swift / iOS',
  description: 'Swift 5.9+ with SwiftUI, async/await, and Apple platform best practices',
  rules: `## Swift Core Principles

- Use Swift 5.9+ features: macros, parameter packs, consuming/borrowing keywords.
- Use value types (structs, enums) by default. Classes only when identity or inheritance is needed.
- Use let over var. Immutability is the default.
- Use guard statements for early exits: \`guard let user = user else { return }\`
- Use optionals properly. Avoid force unwrapping (!) except in tests.
- Use Result type for operations that can fail.
- Follow Swift naming conventions: camelCase for variables/functions, PascalCase for types.

## SwiftUI

- Use SwiftUI for all new UI development. UIKit only for features SwiftUI can't handle.
- Keep views small: extract subviews when a view exceeds 30-40 lines.
- Use @State for view-local state, @Binding for parent-child communication.
- Use @Observable (Observation framework) over @ObservableObject (Combine) in iOS 17+.
- Use @Environment for dependency injection: environment values and objects.
- Use @Query with SwiftData for data-driven views.
- Use ViewModifiers for reusable view modifications.
- Use PreviewProvider for every view with multiple states.

## Architecture

- Use MVVM pattern: View → ViewModel → Model/Service.
- ViewModels should be @Observable classes (not @ObservableObject for new code).
- Use dependency injection for services. Pass dependencies through initializers.
- Use protocols for abstraction and testability.
- Use Swift packages for modularization of large projects.

## Concurrency (Swift Concurrency)

- Use async/await for all asynchronous operations.
- Use Task for launching async work from synchronous contexts.
- Use TaskGroup for concurrent parallel operations.
- Use actors for thread-safe mutable state.
- Use @MainActor for UI-related code.
- Use AsyncStream and AsyncSequence for streaming data.
- Use Sendable protocol for values passed across concurrency boundaries.
- Avoid DispatchQueue and completion handlers in new code.

## Data Management

- Use SwiftData (iOS 17+) for persistence. Core Data for pre-iOS 17 support.
- Use Codable for JSON serialization. Define CodingKeys explicitly when needed.
- Use URLSession with async/await for networking.
- Use Result type for network responses: \`Result<User, NetworkError>\`
- Use enums with associated values for API responses and state machines.

## Error Handling

- Use typed throws (Swift 5.9+) when error types are known.
- Create error enums: \`enum NetworkError: Error { case notFound, unauthorized, serverError(Int) }\`
- Handle errors at the appropriate level — don't catch and ignore.
- Use do-catch for recoverable errors. Let fatal errors propagate.
- Use LocalizedError protocol for user-facing error messages.

## Testing

- Use XCTest for unit and integration tests.
- Use Swift Testing framework (new, for Swift 5.10+) when available.
- Test ViewModels independently from views.
- Use protocols for mockable dependencies.
- Test async code with async test functions.
- Use XCTAssertEqual, XCTAssertThrows with descriptive messages.
- Use Xcode Previews as visual tests during development.

## Performance

- Use Instruments for profiling: Time Profiler, Allocations, Leaks.
- Avoid unnecessary view redraws in SwiftUI. Minimize @State changes.
- Use lazy properties for expensive initialization.
- Use value types to avoid reference counting overhead.
- Use withAnimation for controlled animation triggers.
- Use List with id parameter for efficient list rendering.

## Project Structure

- \`/Sources/App\` — Main app target
- \`/Sources/App/Views\` — SwiftUI views
- \`/Sources/App/ViewModels\` — View models
- \`/Sources/App/Models\` — Data models
- \`/Sources/App/Services\` — Business logic and API clients
- \`/Sources/App/Utilities\` — Extensions and helpers
- \`/Tests\` — Test targets
- \`/Packages\` — Local Swift packages for modularization
`,
};
