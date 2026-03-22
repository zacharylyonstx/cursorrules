'use strict';

module.exports = {
  name: 'Java / Spring',
  description: 'Java 21+ with Spring Boot, modern patterns, and enterprise best practices',
  rules: `## Java Core Principles

- Use Java 21+ features: records, sealed classes, pattern matching, virtual threads, text blocks.
- Use records for immutable data carriers: \`public record User(String name, String email) {}\`
- Use sealed interfaces for controlled type hierarchies.
- Use pattern matching in switch: \`case User u when u.isAdmin() -> ...\`
- Use text blocks for multi-line strings (SQL, JSON, HTML).
- Use var for local variables when the type is obvious from context.

## Spring Boot Architecture

- Use layered architecture: Controller → Service → Repository.
- Controllers handle HTTP mapping. Services handle business logic. Repositories handle data access.
- Use constructor injection (not field injection). It's testable and makes dependencies explicit.
- Use Spring profiles for environment-specific configuration.
- Use @ConfigurationProperties for typed configuration binding.
- Use Spring Boot starters to avoid manual dependency management.

## REST API Design

- Use @RestController for API endpoints.
- Map HTTP methods: @GetMapping, @PostMapping, @PutMapping, @DeleteMapping, @PatchMapping.
- Use ResponseEntity<T> for explicit status codes and headers.
- Return proper HTTP status codes: 200, 201, 204, 400, 401, 403, 404, 409, 422, 500.
- Use @Valid for request body validation with Jakarta Bean Validation annotations.
- Use @PathVariable for resource identifiers, @RequestParam for query parameters.
- Use DTO (Data Transfer Objects) for request/response — never expose entities directly.

## Data Access (Spring Data JPA)

- Use Spring Data JPA repositories for standard CRUD operations.
- Use @Entity with @Table for explicit table mapping.
- Use @GeneratedValue(strategy = GenerationType.IDENTITY) or UUID for primary keys.
- Add @CreatedDate and @LastModifiedDate with Spring Data auditing.
- Use derived query methods: \`findByEmailAndStatus(String email, Status status)\`
- Use @Query for complex queries with JPQL or native SQL.
- Use Pageable for pagination: \`Page<User> findByStatus(Status status, Pageable pageable)\`
- Use @Transactional on service methods, not repository methods.
- Use EntityGraph or JOIN FETCH to prevent N+1 queries.
- Use Flyway or Liquibase for database migrations.

## Validation

- Use Jakarta Bean Validation: @NotNull, @NotBlank, @Size, @Email, @Min, @Max, @Pattern.
- Create custom validators for complex business rules.
- Validate at the controller level with @Valid on request bodies.
- Return structured validation error responses with field names and messages.
- Use validation groups for create vs update scenarios.

## Error Handling

- Use @ControllerAdvice with @ExceptionHandler for global error handling.
- Create custom exceptions: UserNotFoundException extends RuntimeException.
- Return consistent error response format: \`{ "code": "...", "message": "...", "details": [...] }\`
- Map exceptions to HTTP status codes in the advice class.
- Log errors with context (request ID, user ID, operation).
- Never expose stack traces in production responses.

## Security (Spring Security)

- Use Spring Security with SecurityFilterChain (not WebSecurityConfigurerAdapter — deprecated).
- Use JWT for stateless API authentication.
- Use BCryptPasswordEncoder for password hashing.
- Implement role-based access: @PreAuthorize("hasRole('ADMIN')").
- Configure CORS explicitly for API consumers.
- Use method-level security with @Secured or @PreAuthorize.

## Testing

- Use JUnit 5 + Spring Boot Test for integration tests.
- Use @SpringBootTest for full context tests, @WebMvcTest for controller tests.
- Use @DataJpaTest for repository tests with embedded database.
- Use Mockito for mocking dependencies in unit tests.
- Use MockMvc for testing REST endpoints without starting the server.
- Use Testcontainers for database integration tests against real databases.
- Name tests descriptively: @DisplayName("should return 404 when user not found").

## Performance

- Use connection pooling (HikariCP — Spring Boot default).
- Use caching with @Cacheable (Spring Cache abstraction).
- Use virtual threads (Java 21+) for I/O-bound operations.
- Profile with JFR (Java Flight Recorder) and JMC.
- Use lazy loading for JPA associations by default. Eager load explicitly.
- Monitor with Micrometer + Prometheus + Grafana.

## Logging

- Use SLF4J with Logback (Spring Boot default).
- Use structured logging: log in JSON format for production.
- Use MDC for request correlation: \`MDC.put("requestId", requestId)\`
- Log at appropriate levels: ERROR, WARN, INFO, DEBUG.
- Never log sensitive data: passwords, tokens, PII.

## Project Structure

- \`/src/main/java/com/example/app/controller\` — REST controllers
- \`/src/main/java/com/example/app/service\` — Business logic
- \`/src/main/java/com/example/app/repository\` — Data access
- \`/src/main/java/com/example/app/model\` — JPA entities
- \`/src/main/java/com/example/app/dto\` — Data transfer objects
- \`/src/main/java/com/example/app/config\` — Configuration classes
- \`/src/main/java/com/example/app/exception\` — Custom exceptions
- \`/src/main/resources\` — application.yml, migrations
- \`/src/test\` — Test classes mirroring main structure
`,
};
