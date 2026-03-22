'use strict';

module.exports = {
  name: 'Django',
  description: 'Django 5+ with DRF, modern patterns, security, and project organization',
  rules: `## Django Core Principles

- Follow Django's "batteries included" philosophy — use built-in features before reaching for third-party packages.
- Use Django 5+ features: async views, GeneratedField, Field.db_default.
- Use class-based views (CBVs) for standard CRUD operations. Function-based views (FBVs) for custom logic.
- Follow the "fat models, thin views" pattern — business logic belongs in models and managers.
- Use Django's ORM for all database operations. Raw SQL only as a last resort.

## Models

- Every model must have a \`__str__\` method returning a human-readable representation.
- Use UUIDField as primary key for public-facing APIs: \`id = models.UUIDField(primary_key=True, default=uuid.uuid4)\`
- Add \`created_at\` and \`updated_at\` timestamp fields to every model with auto_now_add and auto_now.
- Use choices with TextChoices/IntegerChoices enums, not raw tuples.
- Define custom managers for common querysets: \`objects = UserManager()\`
- Use \`Meta\` class for ordering, indexes, constraints, verbose names.
- Add database indexes for fields used in filtering and ordering.
- Use \`select_related()\` and \`prefetch_related()\` to prevent N+1 queries.
- Never use \`null=True\` on CharField or TextField — use \`blank=True\` with \`default=""\`.

## Views & URLs

- Use path() with typed converters: \`path('users/<int:pk>/', UserDetailView.as_view())\`
- Name all URL patterns for reverse() lookups: \`path('users/', ..., name='user-list')\`
- Use namespaced URLs: \`app_name = 'users'\` in urls.py.
- Group URLs by app. Include app URLs from the project urls.py.
- Use LoginRequiredMixin and PermissionRequiredMixin for access control.
- Use get_object_or_404() for detail views — never catch DoesNotExist manually.

## Django REST Framework

- Use ModelSerializer for standard CRUD. Custom serializers for complex operations.
- Use ViewSets with routers for RESTful resource endpoints.
- Separate read and write serializers: UserListSerializer, UserCreateSerializer.
- Use SerializerMethodField for computed fields in responses.
- Implement pagination globally: CursorPagination for large datasets.
- Use filtering with django-filter: \`filterset_class = UserFilter\`.
- Use throttling for rate limiting API endpoints.
- Use permission classes for authorization: IsAuthenticated, IsAdminUser, custom permissions.
- Version your API: use URL versioning or namespace versioning.

## Forms & Validation

- Use Django Forms for HTML form handling. ModelForm for model-backed forms.
- Validate in clean() methods for cross-field validation.
- Use form_valid() in CBVs for processing valid form data.
- Use crispy-forms or widget-tweaks for form rendering.
- Always validate on the server side even if client-side validation exists.

## Templates

- Use template inheritance: base.html → section.html → page.html.
- Keep template logic minimal. Complex logic belongs in views or template tags.
- Use \`{% url %}\` tag for all internal links. Never hardcode URLs.
- Use \`{% static %}\` for all static file references.
- Create custom template tags and filters for reusable template logic.
- Use \`{% include %}\` for reusable template fragments.

## Security

- Never disable CSRF protection. Use \`{% csrf_token %}\` in all forms.
- Set ALLOWED_HOSTS explicitly in production. Never use \`['*']\`.
- Use Django's built-in password validators. Add custom validators for your requirements.
- Configure security middleware: SecurityMiddleware, X-Content-Type-Options, HSTS.
- Use \`SECRET_KEY\` from environment variables, never commit it.
- Enable \`SECURE_SSL_REDIRECT\`, \`SESSION_COOKIE_SECURE\`, \`CSRF_COOKIE_SECURE\` in production.
- Use Django's built-in protection against XSS, SQL injection, and clickjacking.

## Database & Migrations

- One migration per logical change. Don't combine unrelated changes.
- Use RunPython for data migrations. Keep them reversible when possible.
- Test migrations: \`python manage.py migrate --check\` in CI.
- Use \`makemigrations --check\` to detect unapplied model changes.
- Use database constraints (UniqueConstraint, CheckConstraint) for data integrity.
- Use transactions.atomic() for operations that must succeed or fail together.

## Testing

- Use Django's TestCase for database tests, SimpleTestCase for non-DB tests.
- Use pytest-django for a better testing experience.
- Use factories (factory_boy) for test data, not fixtures.
- Test views with the test client: \`self.client.get('/users/')\`.
- Test models: validation, methods, properties, managers.
- Test permissions and access control explicitly.
- Use override_settings() for test-specific settings.

## Settings

- Use environment variables for all deployment-specific settings.
- Use django-environ or python-decouple for env var parsing.
- Split settings: base.py, development.py, production.py, testing.py.
- Never use DEBUG=True in production. Validate this in deployment.
- Configure logging properly: use Django's LOGGING dict config.

## Async Django

- Use async views for I/O-bound operations: \`async def my_view(request):\`
- Use \`sync_to_async\` for calling sync ORM operations from async views.
- Use \`async_to_sync\` for calling async functions from sync code.
- Use async-compatible packages: httpx instead of requests, aioredis instead of redis.

## Project Structure

- \`/project\` — Django project (settings, urls, wsgi, asgi)
- \`/apps/users\` — User app (models, views, serializers, urls, tests)
- \`/apps/core\` — Shared utilities, base models, middleware
- \`/templates\` — Global templates
- \`/static\` — Static files
- \`/media\` — User uploads
- \`/requirements\` — Split requirements (base.txt, dev.txt, prod.txt)
`,
};
