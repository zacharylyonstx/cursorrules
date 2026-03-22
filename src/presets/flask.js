'use strict';

module.exports = {
  name: 'Flask',
  description: 'Flask web framework with blueprints, extensions, and modern Python patterns',
  rules: `## Flask Architecture

- Use the application factory pattern: \`create_app()\` function that configures and returns the Flask app.
- Use Blueprints to organize routes by feature domain. One blueprint per feature.
- Separate concerns: routes handle HTTP, services handle business logic, models handle data.
- Use Flask extensions through the app factory — initialize with init_app() pattern.
- Use Flask-CORS for cross-origin resource sharing configuration.

## Blueprints & Routes

- Register blueprints with URL prefixes: \`app.register_blueprint(users_bp, url_prefix='/api/users')\`
- Use type converters in routes: \`@bp.route('/users/<int:user_id>')\`
- Return proper status codes: \`return jsonify(data), 201\` for creation.
- Use \`abort()\` for error responses: \`abort(404, description="User not found")\`
- Implement custom error handlers: \`@app.errorhandler(404)\`
- Use \`url_for()\` for URL generation. Never hardcode URLs.

## Request Handling

- Validate request data with marshmallow, Pydantic, or webargs.
- Access request data: \`request.json\` (JSON body), \`request.args\` (query params), \`request.form\` (form data).
- Always validate Content-Type for POST/PUT requests.
- Use \`request.get_json(force=False, silent=True)\` for safe JSON parsing.
- Set maximum content length: \`app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024\`

## Configuration

- Use class-based config: \`class Config\`, \`class DevelopmentConfig(Config)\`, \`class ProductionConfig(Config)\`.
- Load secrets from environment variables, never hardcode.
- Use \`app.config.from_object()\` or \`app.config.from_envvar()\`.
- Required config keys should fail loudly at startup if missing.
- Use python-dotenv for local .env file loading in development.

## Database (SQLAlchemy)

- Use Flask-SQLAlchemy for ORM integration.
- Define models in separate files, import in app factory.
- Use Flask-Migrate (Alembic) for database migrations.
- Use db.session context: commit on success, rollback on failure.
- Use \`db.session.get(User, user_id)\` for primary key lookups (SQLAlchemy 2.0+).
- Close sessions properly — Flask-SQLAlchemy handles this per-request.

## Authentication

- Use Flask-Login for session-based auth or Flask-JWT-Extended for JWT auth.
- Implement \`@login_required\` or custom auth decorators.
- Use Werkzeug's \`generate_password_hash()\` and \`check_password_hash()\` for passwords.
- Store sessions server-side (Redis) in production, not client-side cookies.
- Implement CSRF protection with Flask-WTF for HTML forms.

## Error Handling

- Register custom error handlers for common HTTP errors.
- Return JSON error responses for API endpoints: \`{"error": {"code": "...", "message": "..."}}\`
- Log errors with full context: \`app.logger.exception("Failed to process request")\`
- Use \`@app.errorhandler(Exception)\` as a catch-all for unexpected errors.
- Never expose stack traces in production responses.

## Testing

- Use pytest with pytest-flask for testing.
- Use the test client: \`client = app.test_client()\`
- Use fixtures for app creation and test client setup.
- Test with a separate test database. Use transactions for test isolation.
- Test endpoints: status codes, response data, error cases, auth requirements.
- Use \`app.test_request_context()\` for testing outside of requests.

## Extensions

- Common extensions: Flask-SQLAlchemy, Flask-Migrate, Flask-Login, Flask-CORS, Flask-Mail, Flask-Caching.
- Initialize extensions in the factory: \`db = SQLAlchemy()\` then \`db.init_app(app)\` in create_app().
- Use Flask-Caching for response caching with Redis or memcached backend.
- Use Flask-Limiter for rate limiting API endpoints.

## Async Support (Flask 2.0+)

- Use \`async def\` for route handlers that perform async I/O.
- Use \`await\` for async operations within async route handlers.
- Install flask[async] for async view support.
- Use async-compatible libraries: httpx, aioredis, databases.

## Project Structure

- \`/app\` — Application package
- \`/app/__init__.py\` — App factory (create_app)
- \`/app/blueprints/\` — Feature blueprints
- \`/app/models/\` — SQLAlchemy models
- \`/app/services/\` — Business logic
- \`/app/schemas/\` — Marshmallow/Pydantic schemas
- \`/app/extensions.py\` — Extension instances
- \`/migrations/\` — Alembic migrations
- \`/tests/\` — Test files
- \`/config.py\` — Configuration classes
`,
};
