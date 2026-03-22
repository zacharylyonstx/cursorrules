'use strict';

module.exports = {
  name: 'Svelte',
  description: 'Svelte 5 / SvelteKit with runes, modern patterns, and SSR best practices',
  rules: `## Svelte Architecture

- Use SvelteKit for all new projects. Standalone Svelte is for widgets/embeds only.
- Prefer Svelte 5 runes (\`$state\`, \`$derived\`, \`$effect\`) over Svelte 4 stores and reactive statements.
- One component per file. PascalCase filenames.
- Keep components under 150 lines. Extract logic into .svelte.ts modules.
- Use TypeScript: \`<script lang="ts">\` in all components.

## Svelte 5 Runes

- Use \`$state()\` for reactive variables. It replaces \`let x = ...\` reactive declarations.
- Use \`$derived()\` for computed values. It replaces \`$: x = ...\` reactive statements.
- Use \`$effect()\` for side effects. It replaces \`$: { ... }\` reactive blocks.
- Use \`$props()\` to declare component props with destructuring defaults.
- Use \`$bindable()\` for two-way binding props.
- Runes work in .svelte files and .svelte.ts/js files — use .svelte.ts for shared reactive logic.

## SvelteKit Routing

- File-based routing in \`/src/routes\`. \`+page.svelte\` for pages, \`+layout.svelte\` for layouts.
- Use \`+page.server.ts\` for server-side data loading. Runs only on the server.
- Use \`+page.ts\` for universal (server + client) data loading.
- Use \`+server.ts\` for API endpoints (GET, POST, PUT, DELETE handlers).
- Form actions in \`+page.server.ts\` for progressive enhancement.
- Use \`+error.svelte\` for error pages at each route level.
- Group routes with \`(group)\` folders to share layouts without URL segments.

## Data Loading

- Load data in \`load\` functions, not in components. This enables SSR and preloading.
- Return typed data from load functions: \`export const load: PageServerLoad = async ({ params }) => { ... }\`
- Use \`depends()\` and \`invalidate()\` for fine-grained revalidation.
- Use \`+layout.server.ts\` for data shared across child routes (auth, user info).
- Access loaded data via \`export let data\` (Svelte 4) or \`let { data } = $props()\` (Svelte 5).
- Handle errors in load functions with \`error(404, 'Not found')\` from @sveltejs/kit.

## Forms & Progressive Enhancement

- Use SvelteKit form actions for mutations. They work without JavaScript.
- Use \`enhance\` action from \`$app/forms\` for progressive enhancement (AJAX with JS, full reload without).
- Validate form data on the server in form actions. Return errors to the page.
- Use \`fail()\` to return validation errors without redirecting.
- Show loading states with \`$page.form\` and \`$navigating\`.

## Component Patterns

- Use snippet blocks (\`{#snippet name()}\`) for reusable template fragments (Svelte 5).
- Use \`{@render snippet()}\` to render snippet blocks.
- Use \`<svelte:component this={...}>\` for dynamic components.
- Use \`<svelte:element this={tag}>\` for dynamic HTML elements.
- Transition directives: \`transition:fade\`, \`in:fly\`, \`out:slide\` for animations.
- Use \`{@html ...}\` sparingly and only with sanitized content.

## State Management

- For local state: use \`$state()\` runes directly.
- For shared state: create .svelte.ts modules with exported \`$state\` runes.
- For complex state: use Svelte stores (\`writable\`, \`readable\`, \`derived\`) or class-based state with runes.
- SvelteKit's \`$page\` store for current page data, URL, route info.
- Don't over-engineer state. Svelte's reactivity is simpler than React's.

## Performance

- SvelteKit pre-renders static pages by default. Use \`export const prerender = true\` explicitly.
- Use \`export const ssr = true\` (default) for server-side rendering.
- Lazy-load heavy components with dynamic imports.
- Use \`{#await promise}\` blocks for async data in templates.
- Images: use @sveltejs/enhanced-img or vite-imagetools for optimization.

## Styling

- Scoped styles are the default in Svelte. Component styles don't leak.
- Use \`:global()\` sparingly for styles that must affect child components.
- Tailwind CSS works great with Svelte. Configure in vite.config.ts.
- Use CSS custom properties (variables) for theming. Pass with \`--color\` syntax on components.

## TypeScript

- Type props with \`$props<{ name: string; count?: number }>()\`.
- Type load function returns — SvelteKit generates types automatically with \`$types\`.
- Use \`import type\` for type-only imports.
- Use the generated \`./$types\` imports in load functions for auto-typed params.

## Testing

- Use Vitest for unit tests and Playwright for E2E tests (SvelteKit defaults).
- Test components with @testing-library/svelte.
- Test load functions as plain async functions — they're just functions.
- Use \`msw\` for mocking API calls in tests.

## Project Structure

- \`/src/routes\` — Pages, layouts, API routes, form actions
- \`/src/lib\` — Shared code (\`$lib\` alias)
- \`/src/lib/components\` — Reusable components
- \`/src/lib/server\` — Server-only code (\`$lib/server\`)
- \`/src/lib/stores\` — Shared state
- \`/src/lib/utils\` — Utility functions
- \`/static\` — Static assets served as-is
`,
};
