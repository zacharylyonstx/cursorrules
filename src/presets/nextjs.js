'use strict';

module.exports = {
  name: 'Next.js',
  description: 'Next.js 14+ with App Router, Server Components, and modern patterns',
  rules: `## Next.js Architecture

- Use the App Router (/app directory) for all new routes. Pages Router is legacy.
- Default to Server Components. Only add 'use client' when you need interactivity, browser APIs, or hooks.
- Keep 'use client' boundaries as low in the component tree as possible.
- Never put 'use client' on layout or page files unless absolutely necessary.
- Use route groups (parentheses folders) to organize without affecting URL structure.
- Parallel routes (@folder) for complex layouts. Intercepting routes ((..)folder) for modals.

## Server Components vs Client Components

- Server Components: data fetching, database access, backend logic, heavy imports, static content.
- Client Components: event handlers, useState/useEffect, browser APIs, interactive UI.
- Pass Server Component data to Client Components via props — not the other way.
- Server Components can import Client Components, but Client Components cannot import Server Components.
- Use the "donut pattern": Server Component wrapper with Client Component island inside.

## Data Fetching

- Fetch data in Server Components using async/await directly — no useEffect.
- Use \`fetch()\` with Next.js caching extensions: \`{ cache: 'force-cache' }\` (default), \`{ cache: 'no-store' }\`, \`{ next: { revalidate: 3600 } }\`.
- Deduplicate requests automatically — Next.js memoizes fetch calls with the same URL and options.
- For database queries, use \`unstable_cache\` or implement your own caching layer.
- Use \`generateStaticParams()\` for static generation of dynamic routes.
- Implement loading.tsx for streaming and progressive rendering.
- Use \`notFound()\` and \`redirect()\` from next/navigation for control flow.

## Server Actions

- Define Server Actions in separate files with 'use server' at the top.
- Use \`revalidatePath()\` or \`revalidateTag()\` after mutations to update cached data.
- Validate all Server Action inputs with Zod or similar — they're public API endpoints.
- Use \`useFormStatus()\` for pending states in forms that call Server Actions.
- Use \`useOptimistic()\` for instant UI feedback on mutations.
- Server Actions should return typed results, not throw errors for expected failures.

## Routing & Navigation

- Use \`<Link>\` from next/link for all internal navigation. Never use \`<a>\` for internal routes.
- Use \`useRouter()\` from next/navigation (not next/router) in the App Router.
- Define \`loading.tsx\`, \`error.tsx\`, and \`not-found.tsx\` at each significant route segment.
- Use \`generateMetadata()\` or \`metadata\` export for SEO — never use \`<Head>\` in App Router.
- Middleware (middleware.ts) for auth checks, redirects, geolocation — keep it fast.

## Rendering Strategies

- Static rendering (default): pages built at build time. Best for performance.
- Dynamic rendering: opt in with \`cookies()\`, \`headers()\`, \`searchParams\`, or \`{ cache: 'no-store' }\`.
- ISR (Incremental Static Regeneration): \`{ next: { revalidate: N } }\` for time-based refresh.
- Streaming: use \`loading.tsx\` and \`<Suspense>\` to progressively render slow content.
- Understand that each page/layout independently decides its rendering strategy.

## Image & Font Optimization

- Always use \`next/image\` for images. Set width, height, and use \`priority\` for LCP images.
- Use \`next/font\` for fonts — it self-hosts and eliminates layout shift.
- Configure \`remotePatterns\` in next.config.js for external image domains.
- Use \`sizes\` prop on images for responsive behavior: \`sizes="(max-width: 768px) 100vw, 50vw"\`.

## API Routes

- Use Route Handlers (app/api/*/route.ts) for API endpoints in App Router.
- Export named functions matching HTTP methods: GET, POST, PUT, DELETE, PATCH.
- Return \`NextResponse.json()\` for JSON responses with proper status codes.
- Use Route Handlers for webhooks, third-party API proxying, and data that isn't page-specific.
- For data your pages consume, prefer Server Components with direct data access.

## Error Handling

- error.tsx catches errors within its route segment and renders a fallback UI.
- global-error.tsx catches errors in the root layout.
- Error boundaries must be Client Components ('use client').
- Use \`notFound()\` to trigger not-found.tsx for missing resources.
- Log errors server-side (Sentry, etc.) in error.tsx before rendering fallback.

## Performance

- Minimize client-side JavaScript. Server Components ship zero JS to the browser.
- Use dynamic imports \`next/dynamic\` for heavy client components that aren't needed immediately.
- Configure \`next.config.js\` with \`images.formats: ['image/avif', 'image/webp']\`.
- Use Partial Prerendering (PPR) when available for mixing static shells with dynamic content.
- Monitor with Web Vitals: LCP < 2.5s, FID < 100ms, CLS < 0.1.

## Environment & Configuration

- Use .env.local for local secrets. .env for defaults. Never commit .env.local.
- Prefix client-side env vars with NEXT_PUBLIC_. Server-only vars have no prefix.
- Validate env vars at build time — fail fast on missing config.
- Use next.config.js for build configuration, not runtime logic.

## TypeScript in Next.js

- Always use TypeScript. Enable strict mode in tsconfig.json.
- Type page props: \`{ params: { slug: string }, searchParams: { q?: string } }\`.
- Type Server Actions with \`FormData\` or explicit input types.
- Use \`Metadata\` type from next for generateMetadata return types.

## Project Structure

- \`/app\` — Routes, layouts, pages, loading/error states
- \`/components\` — Reusable UI components (split ui/ and feature/)
- \`/lib\` — Utility functions, API clients, configurations
- \`/types\` — Shared TypeScript types
- \`/public\` — Static assets (images, fonts, favicon)
- \`/actions\` — Server Actions
`,
};
