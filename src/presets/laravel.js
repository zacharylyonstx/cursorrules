'use strict';

module.exports = {
  name: 'Laravel',
  description: 'Laravel 11+ with modern PHP, Eloquent, Livewire, and best practices',
  rules: `## Laravel Architecture

- Follow Laravel conventions. The framework has strong opinions — leverage them.
- Use Laravel 11+ features: simplified directory structure, health routing, per-second scheduling.
- Use service providers for bootstrapping. Register bindings in AppServiceProvider.
- Use Form Requests for validation. One Form Request per endpoint action.
- Use Policies for authorization. One Policy per model.
- Use Events and Listeners for decoupled side effects.
- Use Middleware for cross-cutting concerns: auth, CORS, rate limiting.

## Eloquent Models

- Define fillable or guarded properties on every model.
- Use casts for type casting: \`protected $casts = ['published_at' => 'datetime', 'settings' => 'array']\`
- Use scopes for reusable query constraints: \`public function scopeActive($query)\`
- Define relationships explicitly: hasMany, belongsTo, hasOne, belongsToMany, morphMany.
- Use eager loading to prevent N+1: \`User::with('posts.comments')->get()\`
- Use \`$with\` property for always-eager-loaded relationships.
- Use accessors and mutators with Attribute class (Laravel 9+).
- Use model observers or events for lifecycle hooks.
- Use soft deletes (SoftDeletes trait) for recoverable deletions.
- Add database indexes for foreign keys and frequently queried columns.

## Controllers

- Use single-action controllers (__invoke) for simple endpoints.
- Use resource controllers for CRUD: \`Route::resource('posts', PostController::class)\`
- Keep controllers thin: validate with Form Requests, authorize with Policies, delegate to services.
- Return proper HTTP status codes and JSON responses for APIs.
- Use API resources (JsonResource) for response transformation.

## Routing

- Use route model binding: \`Route::get('/posts/{post}', ...)\` with type-hinted parameters.
- Group routes by middleware and prefix: \`Route::middleware('auth')->prefix('api/v1')->group(...)\`
- Name all routes: \`->name('posts.index')\` for URL generation with route().
- Use route caching in production: \`php artisan route:cache\`.
- Use API versioning: /api/v1/, /api/v2/.

## Validation

- Use Form Request classes for validation — not inline validation in controllers.
- Use Rule objects for complex validation: \`Rule::unique('users')->ignore($user->id)\`
- Use custom validation rules for domain-specific validation.
- Return validation errors as JSON for API endpoints (Laravel does this automatically).
- Use \`sometimes\` rule for conditionally required fields.
- Use \`bail\` rule to stop validation on first failure for a field.

## Authentication & Authorization

- Use Laravel Sanctum for SPA/mobile API authentication.
- Use Laravel Fortify for authentication scaffolding.
- Use Policies for model-based authorization: \`$this->authorize('update', $post)\`
- Use Gates for non-model authorization logic.
- Use middleware for route-level auth: \`->middleware('auth:sanctum')\`

## Queues & Jobs

- Use queues for anything that takes > 1 second: emails, notifications, data processing.
- Make jobs idempotent — they may be retried on failure.
- Use different queues for different priorities: high, default, low.
- Set appropriate retry limits and backoff strategies.
- Use job batching for related groups of jobs.
- Use job chaining for sequential dependent operations.
- Monitor failed jobs: \`php artisan queue:failed\`, configure failed job notifications.

## Testing

- Use PHPUnit or Pest for testing.
- Use RefreshDatabase trait for database tests.
- Use factories for test data: \`User::factory()->create()\`
- Test HTTP endpoints: \`$this->getJson('/api/users')->assertOk()\`
- Test with authentication: \`$this->actingAs($user)->getJson(...)\`
- Test jobs, events, notifications with fakes: \`Queue::fake()\`, \`Event::fake()\`.
- Test mail with Mail::fake() and assertSent().

## Performance

- Use config:cache, route:cache, view:cache in production.
- Use Redis or Memcached for caching, sessions, and queues.
- Cache expensive queries: \`Cache::remember('key', 3600, fn() => ...)\`
- Use eager loading and select specific columns.
- Use database transactions for atomic operations.
- Use Laravel Octane (Swoole/RoadRunner) for high-performance applications.

## Blade Templates

- Use Blade components for reusable UI elements.
- Use slots for component content projection.
- Use @csrf in all forms. Use @method for PUT/PATCH/DELETE.
- Use {{ }} for escaped output, {!! !!} only for trusted HTML.
- Use @vite for asset compilation with Vite.

## Project Structure (Laravel 11+)

- \`/app/Http/Controllers\` — Controllers
- \`/app/Http/Requests\` — Form Request validation
- \`/app/Models\` — Eloquent models
- \`/app/Services\` — Business logic (create this)
- \`/app/Policies\` — Authorization policies
- \`/app/Jobs\` — Queue jobs
- \`/app/Events\` and \`/app/Listeners\` — Event system
- \`/database/migrations\` — Schema migrations
- \`/database/factories\` — Model factories
- \`/routes/api.php\` — API routes
- \`/tests\` — Feature and unit tests
`,
};
