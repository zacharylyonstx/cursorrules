'use strict';

module.exports = {
  name: 'Prisma',
  description: 'Prisma ORM with type-safe queries, migrations, and database patterns',
  rules: `## Prisma Schema Design

- Define all models in prisma/schema.prisma. Keep the schema as the source of truth for your database.
- Use @id with autoincrement() or uuid() for primary keys. Prefer UUID for distributed systems.
- Add @createdAt and @updatedAt fields to every model.
- Use @unique for fields that must be unique (email, username, slug).
- Use @@index for fields frequently used in WHERE and ORDER BY clauses.
- Use @@unique for composite unique constraints.
- Use @relation with explicit foreign key fields: \`userId Int\` + \`user User @relation(fields: [userId], references: [id])\`
- Use enums for fixed sets of values.
- Use @map and @@map to customize database column/table names while keeping clean Prisma names.

## Client Usage

- Use a single PrismaClient instance. Create it in a shared module and import it.
- In development, store the client on globalThis to prevent hot-reload connection issues.
- Always handle disconnection: use prisma.$disconnect() in shutdown handlers.
- Use \`prisma.$transaction()\` for operations that must succeed or fail together.
- Use interactive transactions \`prisma.$transaction(async (tx) => { ... })\` for complex operations.

## Queries

- Use \`select\` to return only needed fields — reduces payload and improves performance.
- Use \`include\` for eager loading relations. Be explicit about nested includes.
- Use \`where\` with typed filters. Prisma provides full TypeScript safety for queries.
- Use cursor-based pagination (\`cursor\`, \`take\`, \`skip\`) for large datasets.
- Use \`findUnique\` for single records by unique field. \`findFirst\` when unique isn't guaranteed.
- Use \`findUniqueOrThrow\` / \`findFirstOrThrow\` when record must exist.
- Use \`createMany\` for bulk inserts (much faster than individual creates).
- Use \`upsert\` for create-or-update operations.

## Migrations

- Run \`prisma migrate dev\` in development (creates migration + applies it).
- Run \`prisma migrate deploy\` in production/CI (applies pending migrations only).
- Name migrations descriptively: \`prisma migrate dev --name add_user_email_index\`
- Never edit migration files after they've been applied to production.
- Use \`prisma migrate diff\` to preview schema changes before migrating.
- Test migrations in CI by running migrate deploy against a test database.

## Type Safety

- Use Prisma's generated types: \`Prisma.UserCreateInput\`, \`Prisma.UserWhereInput\`.
- Use \`Prisma.validator<>()\` to create type-safe query fragments.
- Use generated enum types from Prisma in your application code.
- Run \`prisma generate\` after every schema change to update the client.
- Use \`satisfies\` with Prisma types for compile-time validation of query objects.

## Performance

- Use \`select\` instead of fetching all fields when you need a subset.
- Use \`count()\` for counting, not fetching all records and counting in JS.
- Use raw queries (\`prisma.$queryRaw\`) for complex queries that Prisma can't express efficiently.
- Batch related queries with Promise.all() or interactive transactions.
- Monitor query performance with Prisma's logging: \`new PrismaClient({ log: ['query'] })\`
- Use connection pooling. Set connection_limit in DATABASE_URL or use PgBouncer.

## Seeding

- Define seeds in prisma/seed.ts. Configure in package.json: \`"prisma": { "seed": "tsx prisma/seed.ts" }\`
- Make seeds idempotent — running them twice shouldn't create duplicates.
- Use \`upsert\` or \`createMany\` with skipDuplicates for idempotent seeding.
- Separate seed data into development and production seeds.

## Error Handling

- Catch PrismaClientKnownRequestError for database constraint violations.
- Check error.code for specific errors: P2002 (unique constraint), P2025 (record not found).
- Wrap Prisma errors in domain errors: PrismaError → UserAlreadyExistsError.
- Handle connection errors gracefully with retry logic.

## Best Practices

- Keep Prisma schema in sync with your actual database. Use \`prisma db pull\` if needed.
- Use Prisma Studio (\`prisma studio\`) for visual database exploration during development.
- Use \`prisma format\` to auto-format the schema file.
- Use datasource db with env("DATABASE_URL") — never hardcode connection strings.
- Use multiple Prisma schemas with prisma-merge for large projects (rare, avoid if possible).
`,
};
