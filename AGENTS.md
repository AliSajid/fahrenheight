<!--
SPDX-FileCopyrightText: 2024 - 2025 Ali Sajid Imami
SPDX-License-Identifier: MIT
-->

# AGENTS.md

Guidance for AI coding agents working in the `fahrenheight` repository.

## Project Overview

`fahrenheight` is a **static** SvelteKit web application that converts temperatures between Celsius and Fahrenheit and visualizes the difference between the exact conversion and a common approximation (`(F - 30) / 2 ≈ C`). It is built as a fully client-side, pre-rendered static site using `@sveltejs/adapter-static` — there is no server runtime, no SSR, and no API endpoints. All computation happens in the browser.

- **Author / copyright:** Ali Sajid Imami `<Ali.Sajid.Imami@gmail.com>`
- **License:** MIT (see `LICENSE-MIT`, `REUSE.toml`, `LICENSES/`)
- **Deployment target:** Cloudflare Pages

## Tech Stack & Tooling

| Concern             | Choice                                                         |
| :------------------ | :------------------------------------------------------------- |
| **Framework**       | Svelte 5.45 + SvelteKit 2.49                                   |
| **Build tool**      | Vite 7.2                                                       |
| **Language**        | TypeScript 5.9 (`strict: true`, `moduleResolution: "bundler"`) |
| **Styling**         | Tailwind CSS 4.1 + Skeleton UI 4.6 (cerberus theme)            |
| **Icons**           | `@lucide/svelte`, `@icons-pack/svelte-simple-icons`            |
| **Package manager** | pnpm 10.20.0 (pinned via `packageManager`)                     |
| **Runtime**         | Node.js ≥ 22                                                   |
| **Task runner**     | mise                                                           |
| **Lint / format**   | ESLint 9 (flat config) + Prettier 3                            |
| **Testing**         | Vitest 4 (node + browser projects), Playwright 1.57 for E2E    |
| **Commit tooling**  | Cocogitto (cog) 7.0.0 — Conventional Commits                   |
| **Pre-commit**      | pre-commit v4.3.0 (gitleaks, detect-secrets, yamllint, …)      |
| **Security & CI**   | SonarQube, CodeQL, OSSF Scorecard, Dependency Review           |

## Repository Layout

```text
.github/               # Actions workflows (ci, test, build, release, deploy, security)
src/
  app.css              # Tailwind + Skeleton UI + cerberus theme imports
  app.html             # HTML shell (data-theme="cerberus")
  app.d.ts             # App namespace (currently empty)
  lib/
    index.ts           # Barrel: 9 components, 3 utils, 2 types
    components/        # 9 .svelte components + specs + types.ts
    utils/             # Temperature.class.ts, TemperatureConverter.class.ts, logger.ts, types.ts
  routes/
    +layout.svelte     # Navbar + Footer + children()
    +layout.ts         # export const prerender = true
    +page.svelte       # Main converter page (HeroSection + TemperatureConverter)
    how-it-works/      # +page.svelte + HowItWorksContent.svelte
    approximation-analysis/ # +page.svelte + ApproximationContent.svelte
e2e/                   # Playwright E2E specs (converter.spec.ts)
static/                # Static assets (favicon.svg, robots.txt, etc.)
LICENSES/              # License texts for REUSE compliance
```

## Component Architecture

All components live in `src/lib/components/` and are re-exported from `src/lib/index.ts` (the barrel). Import from `#lib` rather than deep paths.

- **`TemperatureConverter.svelte`**: Main UI. Uses Svelte 5 runes (`$state`, `$derived`, `$props()`). Validates input to a max of 2 decimal places via regex `/\.(\d+)/` and avoids showing `NaN`. Displays Exact, Approximate, and Percentage Difference results with color-coded cards (`variant-filled-warning` for >5% diff, `variant-filled-success` for ≤5%).
- **`TemperatureInput.svelte`**: Props `{ value, activeUnit, onValueChange, onUnitChange }`. Uses `inputmode="decimal"` for mobile keyboards. Employs Skeleton UI button groups (`btn-group preset-filled-surface-200-800`) with active states via `preset-filled-primary-500`.
- **`TemperatureGraph.svelte`**: 800×500 SVG, center ±20°F range, 2° step. Plots exact vs approximate lines using `$derived` for data generation.
- **`ColoredIcon.svelte`**: Supports Lucide and Simple Icons with strict color priority (custom prop > brand map > currentColor). Contains brand color map (e.g., TypeScript `#3178C6`, SvelteKit `#FF3E00`).
- **`TechStackIcon.svelte`**: Wraps `ColoredIcon` as an external link (`target="_blank" rel="noopener noreferrer"`). Includes hover opacity effects and accessibility labels.
- **`Navbar.svelte` & `Footer.svelte`**: Must use opaque theme-adaptive backgrounds (`bg-white dark:bg-surface-900`) instead of semi-transparent tokens to prevent scroll overlap issues. Footer features a 3-column fixed layout detailing the tech stack and attributions. `NavLink.svelte` tracks active state via `$app/state` `page.url.pathname`.

## Core Logic

- **`Temperature.class.ts` & `TemperatureConverter.class.ts`**: Handle exact and approximate conversions, formatting, and percentage difference calculations. Do not use stale legacy files like `temperature.ts`.
- **`logger.ts`**: Development-only logging using `import.meta.env.DEV`. `logger.error()` always logs, while `log/debug/info/warn` are suppressed in production. Use this instead of `console.*`.

## Conventions & Rules

### Formatting & Linting (Prettier & ESLint)

- `semi: false` — **no semicolons**.
- `singleQuote: true` with `trailingComma: "none"`.
- Flat ESLint config utilizing `eslint-config-prettier`, `typescript-eslint`, and `eslint-plugin-svelte`.

### Svelte 5 & Skeleton UI Guidelines

- **Runes Only**: Use `$state`, `$derived`, `$effect`, and `$props()`. Do **not** use legacy `export let` or reactive `$:` statements. Event handlers must use `onclick` instead of `on:click`.
- **Skeleton UI**: Use preset classes (`preset-filled-primary-500`, not legacy `variant-filled-*` for buttons) and utilize UI components for cards/forms.
- **SPDX Headers**: All source files must carry SPDX headers (MIT for source code, CC0-1.0 for config files). Preserve these when editing.
- **Accessibility**: Use semantic HTML, `inputmode="decimal"` for numeric inputs, maintain color contrast, and provide ARIA labels.

## Testing Philosophy

- **Frameworks**: Vitest 4 for unit/browser components, Playwright 1.57 for E2E.
- **Test Consolidation**: Write fewer, more comprehensive tests grouped by feature rather than property. Do not test downstream components (e.g., if `ColoredIcon` tests colors, `TechStackIcon` shouldn't re-test them). Loop through repetitive checks instead of writing identical tests.
- **Vitest Browser Mode**: Use `vitest-browser-svelte` patterns (`render()`, `page.getByRole()`, `expect.element().toBeInTheDocument()`).

## CI/CD Pipeline Architecture

The CI/CD orchestrator (`ci.yaml`) controls the lifecycle and relies heavily on GitHub Actions:

1.  **Test**: Runs linting, type checks (svelte-check), Vitest, and Playwright E2E.
2.  **Build & Package**: Builds the static site and outputs to a compressed artifact (`fahrenheight-{version}.zip`) with a SHA256 digest.
3.  **Release**: Uses Cocogitto (cog) for semantic versioning (stable/next/dev), creates GitHub releases, generates SLSA attestations, and detaches GPG signatures.
4.  **Deploy**: Pushes to Cloudflare Pages via Wrangler (`main` to production, `next` to preview).
5.  **Security Measures**: Pipelines utilize Harden Runner for restricted network egress, pinned action SHAs, minimal permissions, and scheduled SonarQube/CodeQL/OSSF Scorecard scans.

## Task Runner (mise)

This project uses a **Mise-First Approach**. Do not use `pnpm` scripts directly.

- `mise dev` / `mise dev-open`: Start development server.
- `mise build` / `mise preview`: Build static site and preview.
- `mise format` / `mise format:check`: Run Prettier.
- `mise lint` / `mise lint:check`: Run ESLint.
- `mise check` / `mise test` / `mise test-unit`: Type-check and run tests.
- `mise ci`: Run all CI checks locally.

## AI Agent Do / Don't

### Do

- Import components/utils from `#lib` (the barrel), not deep paths.
- Keep all logic client-side — this is a static site.
- Preserve SPDX headers on every file.
- Use Conventional Commits via Cocogitto (`cog commit`).
- Write consolidated, feature-focused tests following existing test patterns.

### Don't

- **Don't add SSR, server routes, or API endpoints** — `prerender = true` is strictly enforced.
- **Don't use semicolons, double quotes, or trailing commas**.
- **Don't commit directly to `main` or `next`** (blocked by pre-commit hooks).
- **Don't use the stale `.github/copilot-instructions.md` as a source of truth**. (It references outdated names and Vitest 3.x).
- **Don't add new dependencies** without checking `package.json` first.
- **Don't try to commit or push changes on your own**.
