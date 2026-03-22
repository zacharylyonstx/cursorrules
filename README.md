# cursorrules

[![npm version](https://img.shields.io/npm/v/cursorrules.svg)](https://www.npmjs.com/package/cursorrules)
[![license](https://img.shields.io/npm/l/cursorrules.svg)](https://github.com/zacharylyonstx/cursorrules/blob/main/LICENSE)
[![downloads](https://img.shields.io/npm/dm/cursorrules.svg)](https://www.npmjs.com/package/cursorrules)

**Generate optimal `.cursorrules` files for any project in seconds.**

Zero config. Auto-detects your frameworks, languages, and tools. Generates genuinely useful AI coding rules — not generic boilerplate.

<!-- ![Demo](./demo.gif) -->

## Why?

Cursor IDE uses `.cursorrules` files to understand your project's conventions. Good rules = better AI suggestions. Bad rules = garbage output.

**The problem:** Writing good `.cursorrules` by hand is tedious, and most existing templates are too generic.

**The solution:** `cursorrules` scans your actual project — `package.json`, file structure, dependencies — and generates rules specifically tailored to your stack. React + Next.js + Tailwind + Prisma? You get rules for all four, intelligently merged without duplicates.

## Quick Start

```bash
# Auto-detect and generate (zero config)
npx cursorrules init

# Add specific framework rules
npx cursorrules add react
npx cursorrules add tailwind

# See all available presets
npx cursorrules list
```

That's it. No config files, no setup, no dependencies to install.

## What It Detects

| Category | Frameworks & Languages |
|----------|----------------------|
| **Frontend** | React, Next.js, Vue/Nuxt, Svelte/SvelteKit, Angular |
| **Backend** | Express/Fastify/Koa, FastAPI, Django, Flask, Laravel |
| **Languages** | TypeScript, Python, Go, Rust, Java/Spring, Ruby/Rails, PHP, Swift/iOS |
| **Tools** | Tailwind CSS, Prisma, Docker, Testing (Jest/Vitest/Playwright) |
| **Infrastructure** | Monorepo (Turborepo/Nx/Lerna), Docker Compose |

## Commands

### `cursorrules init`

Scans your project and generates a `.cursorrules` file with rules for every detected framework and language.

```bash
npx cursorrules init          # Generate .cursorrules
npx cursorrules init --force  # Overwrite existing file
```

**What happens:**
1. Scans `package.json`, `go.mod`, `Cargo.toml`, `requirements.txt`, etc.
2. Detects frameworks from dependencies and file structure
3. Loads matching presets (150+ lines of rules each)
4. Merges everything into a single, deduplicated `.cursorrules` file

### `cursorrules add <preset>`

Add rules for a specific framework or language. Merges into your existing `.cursorrules` without duplicates.

```bash
npx cursorrules add react      # Add React rules
npx cursorrules add tailwind   # Add Tailwind CSS rules
npx cursorrules add testing    # Add testing best practices
npx cursorrules add docker     # Add Docker rules
```

**Smart aliases work too:**
- `next` → Next.js
- `ts` → TypeScript
- `py` → Python
- `rails` → Ruby/Rails
- `spring` → Java/Spring
- `ios` → Swift/iOS

### `cursorrules list`

Shows all available presets organized by category.

```bash
npx cursorrules list
```

## What Makes These Rules Good?

Every preset is **150+ lines of genuinely opinionated, actionable rules.** Not vague advice like "write clean code" — actual patterns:

**React preset includes:**
- Hook patterns (when to use `useCallback` vs `useMemo` vs neither)
- State management decision tree (local → Context → Zustand)
- Component design rules (size limits, prop patterns, composition)
- Testing patterns (React Testing Library queries, MSW for mocking)
- Performance optimization (when to `React.memo`, code splitting, virtualization)

**Next.js preset includes:**
- Server vs Client Component decision framework
- Data fetching patterns (Server Components, Route Handlers, Server Actions)
- Caching strategies (revalidation, ISR, streaming)
- Rendering strategy selection (static, dynamic, ISR, PPR)
- TypeScript patterns specific to Next.js

**Python preset includes:**
- Type hint patterns for 3.10+ (union types, Protocol, TypeGuard)
- Async patterns (TaskGroup, structured concurrency)
- Project structure (pyproject.toml, src layout)
- Testing patterns (pytest, fixtures, parametrize)
- Error handling (custom exceptions, Result types)

Every preset follows this philosophy: **specific enough to be useful, opinionated enough to prevent bad patterns.**

## Pro Rules Pack ⚡

The free CLI gives you solid rules for 20+ frameworks. Want more?

**[Pro Rules Pack](https://github.com/zacharylyonstx/cursorrules#pro-rules)** includes:

- 🏗️ **Architecture presets** — Clean Architecture, DDD, Event-Driven, Microservices
- 🔒 **Security rules** — OWASP patterns, auth best practices, input validation
- ⚡ **Performance rules** — Database optimization, caching strategies, bundle optimization
- 👥 **Team conventions** — Code review rules, PR templates, commit conventions
- 🧪 **Advanced testing** — Property-based testing, contract testing, chaos engineering
- 📱 **Mobile** — React Native, Flutter, native iOS/Android patterns

[Learn more →](https://github.com/zacharylyonstx/cursorrules#pro-rules)

## How Rules Are Merged

When multiple presets apply (e.g., React + TypeScript + Tailwind), `cursorrules` merges them intelligently:

1. **Section-based merging** — Rules are organized by topic (Architecture, Testing, Performance)
2. **Deduplication** — Identical rules are collapsed, even if worded slightly differently
3. **No conflicts** — Framework-specific rules coexist (React hooks + TypeScript types)
4. **Sensible ordering** — Architecture → Patterns → Performance → Testing → Project Structure

## Configuration

None needed. But if you want to customize:

1. Run `cursorrules init` to generate the base file
2. Edit `.cursorrules` directly — add your team's conventions
3. Use `cursorrules add <preset>` to merge in additional rules later

The generated file is plain text. Edit it however you want.

## FAQ

**Q: Does this work with Cursor IDE only?**
A: The `.cursorrules` file format is used by Cursor IDE. Other AI coding tools may adopt similar formats in the future.

**Q: Do I need to install this globally?**
A: No. Use `npx cursorrules` to run it directly without installation.

**Q: Will this overwrite my existing `.cursorrules`?**
A: Not by default. Use `--force` to overwrite, or use `add` to merge new rules in.

**Q: How do I update rules for a new framework version?**
A: Run `cursorrules init --force` to regenerate, or manually update sections. Presets are updated with new CLI versions.

## Contributing

PRs welcome! To add a new preset:

1. Create `src/presets/your-preset.js` exporting `{ name, description, rules }`
2. Add detection logic in `src/detector.js`
3. Add the preset key to the category list in `src/cli.js`

## License

MIT © [Zachary Lyons](https://github.com/zacharylyonstx)

---

**If this saves you time, [star the repo](https://github.com/zacharylyonstx/cursorrules) ⭐ and [sponsor the project](https://github.com/sponsors/zacharylyonstx) 💛**

₿ Bitcoin tips: `bc1qshgk2p79jg34ax3lpywqj47fpcrqzsma95gesw`
