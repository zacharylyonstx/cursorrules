'use strict';

module.exports = {
  name: 'Vue',
  description: 'Vue 3 with Composition API, Pinia, and modern Vue ecosystem',
  rules: `## Vue 3 Architecture

- Use Vue 3 with Composition API exclusively. Options API is legacy.
- Use \`<script setup>\` syntax for all Single File Components — it's more concise and performant.
- One component per file. PascalCase filenames matching component names.
- Template, script, then style order in SFCs. Always use scoped styles or CSS modules.
- Use TypeScript with Vue. Enable \`"jsx": "preserve"\` in tsconfig for JSX support.

## Composition API Patterns

- Extract reusable logic into composables: \`use[Feature].ts\` files in \`/composables\`.
- Composables should return reactive refs and functions, not raw values.
- Use \`ref()\` for primitives, \`reactive()\` for objects. Prefer \`ref()\` — it's more explicit.
- Use \`computed()\` for derived values. Never use \`watch\` for what \`computed\` can do.
- Use \`watchEffect()\` for side effects that depend on reactive data.
- Use \`watch()\` with explicit sources when you need old/new values or to control timing.
- Use \`toRefs()\` and \`toRef()\` when destructuring reactive objects to maintain reactivity.

## Component Design

- Define props with \`defineProps<{ title: string; count?: number }>()\` using TypeScript generics.
- Define emits with \`defineEmits<{ (e: 'update', value: string): void }>()\`.
- Use \`defineModel()\` for v-model bindings (Vue 3.4+).
- Use \`defineExpose()\` sparingly — only expose what parent components genuinely need.
- Prefer slots over props for content projection. Named slots for complex layouts.
- Use \`provide/inject\` for dependency injection across deep component trees.
- Keep templates readable: extract complex expressions into computed properties or methods.

## State Management (Pinia)

- Use Pinia for global state. One store per domain concern.
- Use Setup Stores syntax (function-based) over Options Stores for better TypeScript inference.
- Keep stores focused: auth store, cart store, UI store — not one mega store.
- Actions for async operations, getters for computed derived state.
- Use \`storeToRefs()\` when destructuring store state to maintain reactivity.
- Never mutate store state directly from components — use actions.

## Routing (Vue Router)

- Use \`<RouterLink>\` for internal navigation. Never use \`<a>\` for internal routes.
- Lazy-load route components: \`() => import('./views/UserProfile.vue')\`.
- Use route guards for authentication and authorization checks.
- Type route params with \`defineProps\` when using props: true in route config.
- Use \`useRoute()\` and \`useRouter()\` in setup, not \`this.$route\` / \`this.$router\`.

## Performance

- Use \`v-once\` for truly static content that never changes.
- Use \`v-memo\` for expensive list items with known dependencies.
- Use \`<component :is>\` for dynamic components, but avoid unnecessary component switches.
- Lazy-load heavy components with \`defineAsyncComponent()\`.
- Use \`<Suspense>\` for async component loading states.
- Use \`<KeepAlive>\` for caching component instances in tabbed interfaces.
- Avoid \`v-if\` and \`v-for\` on the same element — use a wrapper or computed filter.

## Template Best Practices

- Use \`v-for\` with \`:key\` always — use unique IDs, never indices for dynamic lists.
- Prefer \`v-show\` over \`v-if\` for frequently toggled elements (avoids mount/unmount cost).
- Use \`v-if\` / \`v-else-if\` / \`v-else\` chains, not separate \`v-if\` blocks on mutually exclusive conditions.
- Use shorthand: \`:\` for \`v-bind\`, \`@\` for \`v-on\`, \`#\` for \`v-slot\`.
- Never use complex logic in templates. Move it to \`computed\` or methods.

## TypeScript Integration

- Use \`defineComponent()\` only in non-\`<script setup>\` components (rare).
- Type emitted events, props, and slots for full type safety.
- Use \`PropType<T>\` only for Options API. Composition API uses generic type parameters directly.
- Type composable return values explicitly when they're exported.

## Testing

- Use Vitest as the test runner (fast, Vue-native).
- Use @vue/test-utils for component testing.
- Test component behavior through the DOM, not internal state.
- Use \`mount()\` for integration tests, \`shallowMount()\` for isolated unit tests.
- Test composables by wrapping them in a test component or using @vue/test-utils helpers.

## Project Structure

- \`/src/components\` — Reusable UI components
- \`/src/composables\` — Composition functions (use*.ts)
- \`/src/views\` or \`/src/pages\` — Route-level components
- \`/src/stores\` — Pinia stores
- \`/src/router\` — Vue Router config
- \`/src/types\` — TypeScript types
- \`/src/utils\` — Utility functions
- \`/src/assets\` — Static assets (images, fonts)
`,
};
