'use strict';

module.exports = {
  name: 'Ruby / Rails',
  description: 'Ruby on Rails 7+ with Hotwire, modern patterns, and conventions',
  rules: `## Ruby Core Style

- Follow the Ruby Style Guide. Use RuboCop for enforcement.
- Use Ruby 3.2+ features: pattern matching, data classes, endless methods.
- Prefer symbols over strings for internal identifiers: :status, :role, :type.
- Use frozen_string_literal: true magic comment at the top of every file.
- Prefer double-quoted strings when interpolation might be needed.
- Use guard clauses for early returns: \`return unless user.active?\` not nested if blocks.
- Methods should be under 15 lines. Classes under 100 lines.
- Use descriptive method names: \`calculate_total_price\`, not \`calc\` or \`process\`.
- Use predicate methods ending in ?: \`user.active?\`, \`order.paid?\`
- Use bang methods (!) for dangerous operations or in-place mutations.

## Rails Architecture

- Follow Rails conventions. Fight the framework only when you have a compelling reason.
- Use the Rails Way: convention over configuration.
- Fat models, skinny controllers. Business logic in models and service objects.
- Use concerns for shared model behavior. Keep concerns focused and small.
- Use service objects for complex business operations that span multiple models.
- Use form objects for complex forms that don't map to a single model.
- Use query objects for complex database queries.
- Use decorators/presenters for complex view logic. Keep helpers minimal.

## Models (ActiveRecord)

- Add validations: presence, uniqueness, format, length, numericality.
- Add database-level constraints (NOT NULL, unique indexes) to match validations.
- Use scopes for common queries: \`scope :active, -> { where(active: true) }\`
- Use enums for status fields: \`enum status: { draft: 0, published: 1, archived: 2 }\`
- Add indexes for foreign keys, frequently queried columns, and unique constraints.
- Use counter_cache for counting associations.
- Use has_many :through instead of has_and_belongs_to_many for join tables.
- Always specify dependent: :destroy or :nullify on has_many associations.

## Controllers

- Use strong parameters for all user input.
- Use before_action for shared setup: authentication, loading resources.
- Keep actions under 10 lines. Extract logic to services or model methods.
- Use respond_to for format negotiation (HTML, JSON, Turbo Stream).
- Return proper HTTP status codes: :created, :unprocessable_entity, :not_found.
- Use rescue_from for controller-level error handling.

## Hotwire (Turbo + Stimulus)

- Use Turbo Frames for updating page sections without full page loads.
- Use Turbo Streams for real-time updates (create, append, replace, remove).
- Use Stimulus for JavaScript behavior: small, focused controllers.
- Name Stimulus controllers descriptively: \`clipboard-controller\`, \`search-controller\`.
- Use Stimulus values, targets, and actions for clean controller interfaces.
- Prefer Turbo over custom JavaScript. Reach for Stimulus only when Turbo isn't enough.

## Views & Templates

- Use partials for reusable template fragments: \`render 'shared/header'\`.
- Use local variables in partials, not instance variables.
- Use content_for blocks for page-specific content in layouts.
- Use helpers sparingly. Complex view logic belongs in presenters/decorators.
- Use data attributes for Stimulus controller connections.

## Testing (RSpec)

- Use RSpec for testing. Minitest is fine but RSpec is more expressive.
- Use factories (FactoryBot) for test data, not fixtures.
- Test models: validations, scopes, methods, associations.
- Test controllers: request specs over controller specs (Rails 5+).
- Test features: Capybara system tests for critical user flows.
- Use shared examples for common behavior patterns.
- Use let and before blocks for setup. Avoid instance variables in specs.
- Run tests in parallel: parallel_tests gem.

## Background Jobs

- Use Active Job with Sidekiq (or GoodJob for Postgres-backed jobs).
- Keep jobs idempotent — they might be retried.
- Use queues for different priority levels: default, mailers, critical.
- Set retry limits and dead letter handling.
- Test jobs with perform_inline in tests.

## Security

- Use strong parameters in every controller.
- Enable CSRF protection (default). Use protect_from_forgery.
- Use has_secure_password for authentication.
- Use Devise for full-featured auth (if needed).
- Sanitize user input in views. Rails does this by default with ERB.
- Use Content Security Policy headers.

## Performance

- Use eager loading to prevent N+1: \`includes(:comments)\`, \`preload\`, \`eager_load\`.
- Use Bullet gem in development to detect N+1 queries.
- Cache with Russian doll caching: \`cache [model, 'partial_name'] do\`
- Use counter caches for association counts.
- Use database indexes. Run \`EXPLAIN ANALYZE\` on slow queries.
- Use background jobs for anything that takes > 1 second.

## Project Structure (Standard Rails)

- \`/app/models\` — ActiveRecord models
- \`/app/controllers\` — Request handlers
- \`/app/views\` — Templates (ERB/Haml/Slim)
- \`/app/services\` — Service objects (create this)
- \`/app/jobs\` — Background jobs
- \`/app/mailers\` — Email senders
- \`/app/javascript\` — Stimulus controllers, JS
- \`/db/migrate\` — Database migrations
- \`/spec\` — Tests (RSpec)
`,
};
