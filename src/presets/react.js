'use strict';

module.exports = {
  name: 'React',
  description: 'React 18+ with hooks, modern patterns, and performance best practices',
  rules: `## React Architecture & Patterns

- Use functional components exclusively. Never use class components in new code.
- Prefer named exports over default exports for better refactoring and IDE support.
- One component per file. The filename should match the component name exactly.
- Co-locate related files: Component.tsx, Component.test.tsx, Component.module.css in the same directory.
- Use barrel exports (index.ts) sparingly — only for public API boundaries, not internal modules.

## Component Design

- Keep components under 150 lines. If longer, extract sub-components or custom hooks.
- Props interfaces should be defined above the component, exported if reused.
- Use destructuring in function parameters: \`function Button({ label, onClick, variant = 'primary' }: ButtonProps)\`
- Avoid prop drilling beyond 2 levels. Use Context, composition, or state management instead.
- Prefer composition over configuration: use children and render props over complex prop objects.
- Use \`React.memo()\` only when you've measured a performance problem, not preemptively.
- Never use \`index\` as a key in lists unless the list is static and never reordered.

## Hooks Best Practices

- Extract business logic into custom hooks named \`use[Feature]\`.
- Custom hooks should return objects (not arrays) when returning 3+ values.
- Always specify complete dependency arrays in useEffect/useMemo/useCallback.
- Use \`useCallback\` for functions passed to memoized child components.
- Use \`useMemo\` for expensive computations, not for simple object creation.
- Avoid useEffect for derived state — compute it during render instead.
- Never call hooks conditionally. Early returns must come after all hook calls.
- Use \`useRef\` for values that don't trigger re-renders (timers, previous values, DOM refs).

## State Management

- Start with local state (useState). Only lift state when actually shared between components.
- For complex state logic, prefer \`useReducer\` over multiple \`useState\` calls.
- Context is for dependency injection (theme, auth, i18n), not for high-frequency updates.
- If you need global state with frequent updates, use Zustand, Jotai, or Redux Toolkit — not Context.
- Never store derived data in state. Compute it from existing state during render.
- Keep state as close to where it's used as possible.

## Event Handling

- Name event handlers with \`handle\` prefix: \`handleClick\`, \`handleSubmit\`, \`handleInputChange\`.
- Name event props with \`on\` prefix: \`onClick\`, \`onSubmit\`, \`onChange\`.
- Always prevent default for form submissions: \`e.preventDefault()\`.
- Use event delegation when handling events on many similar elements.
- Type event handlers properly: \`React.MouseEvent<HTMLButtonElement>\`, not \`any\`.

## Performance

- Use React.lazy() and Suspense for code-splitting at the route level.
- Implement error boundaries around independently-failing sections.
- Use \`startTransition\` for non-urgent state updates that might cause heavy re-renders.
- Profile before optimizing. Use React DevTools Profiler to find actual bottlenecks.
- Avoid creating new objects/arrays in render unless necessary — hoist static values.
- For lists with 1000+ items, use virtualization (react-window or @tanstack/virtual).

## Data Fetching

- Use TanStack Query (React Query) or SWR for server state management.
- Separate server state (API data) from client state (UI state) completely.
- Implement optimistic updates for better UX on mutations.
- Handle loading, error, and empty states explicitly — never leave them undefined.
- Use AbortController to cancel in-flight requests on unmount.

## Forms

- Use controlled components for forms that need validation or dependent fields.
- For complex forms, use React Hook Form or Formik — don't reinvent validation.
- Debounce search/filter inputs with 300ms delay.
- Show validation errors inline, next to the field, not in alerts.
- Disable submit buttons during submission to prevent double-submits.

## TypeScript Integration

- Define component props with \`interface\`, not \`type\` (interfaces are more extensible).
- Use \`React.FC\` sparingly — prefer explicit return types or let inference work.
- Avoid \`any\`. Use \`unknown\` for truly unknown types, then narrow.
- Use discriminated unions for components with variant-dependent props.
- Generic components should constrain their type parameters: \`<T extends BaseItem>\`.

## Testing

- Test behavior, not implementation. Test what the user sees and does.
- Use React Testing Library. Avoid Enzyme.
- Query by role, label, or text — never by test ID unless no accessible alternative exists.
- Test user interactions: click, type, submit. Don't test state variables directly.
- Mock API calls at the network level (MSW), not at the module level.
- Each test should be independent — no shared mutable state between tests.

## Accessibility

- Every interactive element must be keyboard accessible.
- Use semantic HTML: \`<button>\` not \`<div onClick>\`, \`<nav>\` not \`<div class="nav">\`.
- Images need meaningful alt text. Decorative images get \`alt=""\`.
- Form fields need associated labels. Use \`htmlFor\` or wrap input in \`<label>\`.
- Announce dynamic content changes with aria-live regions.
- Test with a screen reader at least once before shipping.

## File Organization

- \`/components\` — Reusable UI components
- \`/hooks\` — Custom hooks
- \`/pages\` or \`/routes\` — Route-level components
- \`/utils\` — Pure utility functions
- \`/types\` — Shared TypeScript types
- \`/constants\` — App-wide constants
- \`/services\` or \`/api\` — API client functions
`,
};
