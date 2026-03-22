'use strict';

module.exports = {
  name: 'Tailwind CSS',
  description: 'Tailwind CSS v4+ utility-first patterns, component design, and responsive layout',
  rules: `## Tailwind Core Principles

- Utility-first: compose designs from utility classes. Extract components only when patterns repeat 3+ times.
- Never write custom CSS unless Tailwind genuinely can't express what you need.
- Use the default design system (spacing, colors, typography) as much as possible. Consistency beats customization.
- Configure your theme in tailwind.config.js — extend, don't override the defaults.
- Use Tailwind's JIT mode (default in v3+) — it generates only the CSS you use.

## Class Organization

- Order classes consistently: layout → sizing → spacing → typography → colors → effects → states.
- Example: \`flex items-center gap-4 w-full p-4 text-sm font-medium text-gray-700 bg-white rounded-lg shadow-sm hover:bg-gray-50\`
- Use Prettier with prettier-plugin-tailwindcss for automatic class sorting.
- Break long class lists across multiple lines in templates for readability.
- Group related utilities with comments in complex components.

## Responsive Design

- Mobile-first: default styles for mobile, then add breakpoints for larger screens.
- Use breakpoint prefixes: \`sm:\`, \`md:\`, \`lg:\`, \`xl:\`, \`2xl:\` for responsive variants.
- Common pattern: \`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3\`
- Use \`container mx-auto px-4\` for centered, responsive containers.
- Don't hide/show completely different layouts per breakpoint — refactor the component instead.

## Color System

- Use semantic color names in your config: \`primary\`, \`secondary\`, \`danger\`, \`success\` — not raw hex values.
- Use opacity modifiers: \`bg-blue-500/75\` for 75% opacity.
- Use CSS variables for dynamic theming: \`--color-primary: 59 130 246;\`
- Keep a limited, intentional color palette. More than 5 brand colors is usually too many.
- Use gray scale consistently: pick one gray (gray, slate, zinc, neutral, stone) and stick with it.

## Typography

- Use Tailwind's font size scale: \`text-xs\`, \`text-sm\`, \`text-base\`, \`text-lg\`, \`text-xl\`, etc.
- Use \`prose\` class from @tailwindcss/typography for rich text/markdown content.
- Set line-height with font size: \`text-sm/6\` for text-sm with line-height of 1.5rem.
- Use \`font-sans\`, \`font-serif\`, \`font-mono\` — configure custom fonts in theme.
- Use \`tracking-tight\` for headings, default tracking for body text.
- Use \`truncate\` or \`line-clamp-*\` for text overflow.

## Spacing & Layout

- Use Tailwind's spacing scale consistently: 0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, etc.
- Prefer \`gap\` over margin for spacing between flex/grid children.
- Use \`space-x-*\` and \`space-y-*\` for simple uniform spacing.
- Use CSS Grid (\`grid\`) for 2D layouts, Flexbox (\`flex\`) for 1D alignment.
- Common card pattern: \`rounded-lg border border-gray-200 bg-white p-6 shadow-sm\`

## Component Patterns

- Extract repeated patterns into components (React/Vue/Svelte), not @apply.
- Use @apply sparingly — only in global styles or base components. Prefer utility classes.
- Create a design system with consistent component classes in a shared component library.
- Use \`group\` and \`group-hover:\` for parent-child hover interactions.
- Use \`peer\` and \`peer-*:\` for sibling-based styling (form labels on focus, etc.).

## Dark Mode

- Use \`dark:\` variant with class-based dark mode: \`dark:bg-gray-900 dark:text-white\`.
- Configure \`darkMode: 'class'\` in tailwind.config.js.
- Design dark mode from the start, not as an afterthought.
- Use \`dark:bg-gray-900\` not \`dark:bg-black\` — pure black is harsh on screens.
- Test both modes. Common issues: contrast ratios, shadows, borders, images.

## Animation & Interaction

- Use built-in transitions: \`transition-colors duration-200\`, \`transition-all duration-300\`.
- Use \`hover:\`, \`focus:\`, \`active:\`, \`focus-visible:\` for interactive states.
- Always include \`focus-visible:\` styles for keyboard navigation accessibility.
- Use \`animate-spin\`, \`animate-pulse\`, \`animate-bounce\` for loading states.
- Custom animations: define in tailwind.config.js under \`theme.extend.animation\`.

## Forms

- Use @tailwindcss/forms plugin for form element base styles.
- Style form states: \`focus:ring-2 focus:ring-blue-500 focus:border-blue-500\`.
- Use \`disabled:opacity-50 disabled:cursor-not-allowed\` for disabled states.
- Use \`invalid:border-red-500 invalid:text-red-600\` for validation states.
- Consistent input pattern: \`w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500\`

## Performance

- Tailwind's JIT compiler purges unused CSS automatically.
- Avoid dynamic class names: \`bg-\${color}-500\` won't work — use a mapping object.
- Use \`@tailwindcss/container-queries\` for component-level responsive design.
- Prefer Tailwind utilities over custom CSS to keep bundle size minimal.

## Accessibility

- Use sufficient color contrast ratios: 4.5:1 for normal text, 3:1 for large text.
- Use \`sr-only\` for screen-reader-only text.
- Use \`not-sr-only\` to make sr-only elements visible on focus.
- Always provide \`focus-visible:\` styles — never remove focus outlines without replacement.
- Test with forced-colors mode (Windows High Contrast).
`,
};
