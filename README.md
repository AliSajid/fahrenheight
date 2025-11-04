# Fahrenheit Temperature Converter

[![Test and Check](https://github.com/AliSajid/fahrenheight/actions/workflows/test.yaml/badge.svg)](https://github.com/AliSajid/fahrenheight/actions/workflows/test.yaml)
[![Deploy to Cloudflare Pages](https://github.com/AliSajid/fahrenheight/actions/workflows/deploy.yaml/badge.svg)](https://github.com/AliSajid/fahrenheight/actions/workflows/deploy.yaml)
[![CodeQL](https://github.com/AliSajid/fahrenheight/actions/workflows/codeql.yaml/badge.svg)](https://github.com/AliSajid/fahrenheight/actions/workflows/codeql.yaml)
[![Scorecard](https://github.com/AliSajid/fahrenheight/actions/workflows/scorecard.yaml/badge.svg)](https://github.com/AliSajid/fahrenheight/actions/workflows/scorecard.yaml)
[![Dependency Review](https://github.com/AliSajid/fahrenheight/actions/workflows/dependency-review.yaml/badge.svg)](https://github.com/AliSajid/fahrenheight/actions/workflows/dependency-review.yaml)

[![GitHub License](https://img.shields.io/github/license/AliSajid/fahrenheight)](LICENSE)
[![GitHub Release](https://img.shields.io/github/v/release/AliSajid/fahrenheight)](https://github.com/AliSajid/fahrenheight/releases)
[![Node.js Version](https://img.shields.io/badge/node-22.x-brightgreen)](https://nodejs.org/)
[![pnpm](https://img.shields.io/badge/pnpm-10.x-orange)](https://pnpm.io/)
[![SvelteKit](https://img.shields.io/badge/SvelteKit-2.x-ff3e00?logo=svelte)](https://svelte.dev/)
[![Svelte](https://img.shields.io/badge/Svelte-5.x-ff3e00?logo=svelte)](https://svelte.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.x-06B6D4?logo=tailwind-css)](https://tailwindcss.com/)

A static SvelteKit web application demonstrating:

1. Dynamic bidirectional temperature conversion (Celsius ↔ Fahrenheit)
2. Analysis of the approximation formula `(F - 32) / 2 ≈ C` vs the exact formula `(F - 32) * 5/9 = C`

Built with SvelteKit 2.x, Svelte 5, Tailwind CSS 4.x, and Skeleton UI.

## Prerequisites

- [Node.js](https://nodejs.org/) 22.x
- [pnpm](https://pnpm.io/) package manager
- [mise](https://mise.jdx.dev/) task runner (optional but recommended)

## Setup

Install dependencies:

```sh
pnpm install
```

## Development

This project uses [mise](https://mise.jdx.dev/) as the primary task runner. All development commands are defined in `mise.toml` and run directly without relying on package.json scripts.

Start the development server:

```sh
mise dev

# or open in browser automatically
mise dev-open
```

> **Note**: This project uses a mise-first approach. The `package.json` only contains the `prepare` lifecycle hook for SvelteKit type generation. All other tasks should be run through mise.

## Building

Build the static site for production:

```sh
mise build
```

Preview the production build:

```sh
mise preview
```

## Testing

Run all tests:

```sh
mise test
```

Run only unit tests:

```sh
mise test-unit
```

Run only E2E tests:

```sh
mise test-e2e
```

## Code Quality

Type-check:

```sh
mise check
```

Lint and check code (Prettier + ESLint, no fixes):

```sh
mise lint
# or explicitly
mise lint:check
```

Check code formatting (no changes):

```sh
mise format:check
```

Format code (write changes):

```sh
mise format
```

Run all CI checks (lint, format, type-check, tests):

```sh
mise ci
```

## Available Mise Tasks

View all available tasks:

```sh
mise tasks
```

Key tasks:

| Task                | Description                               |
| ------------------- | ----------------------------------------- |
| `mise dev`          | Start development server                  |
| `mise dev-open`     | Start dev server and open browser         |
| `mise build`        | Build static site for production          |
| `mise preview`      | Preview production build                  |
| `mise check`        | Type-check with svelte-check              |
| `mise lint`         | Check code with ESLint and Prettier       |
| `mise lint:check`   | Same as lint (alias)                      |
| `mise format`       | Format code with Prettier (write changes) |
| `mise format:check` | Check formatting (no changes)             |
| `mise test`         | Run all tests (unit + E2E)                |
| `mise test-unit`    | Run unit tests with Vitest                |
| `mise test-e2e`     | Run E2E tests with Playwright             |
| `mise ci`           | Run all CI checks                         |
| `mise install`      | Install dependencies                      |
| `mise sync`         | Sync SvelteKit types                      |

All mise tasks execute commands directly using `pnpm exec`, ensuring consistent behavior across local development and CI/CD environments.

## Project Structure

```text
src/
├── routes/           # SvelteKit routes
│   ├── +page.svelte # Main application page
│   └── +layout.svelte
├── lib/              # Reusable components and utilities
│   ├── components/  # Svelte components
│   └── utils/       # Utility functions
├── app.html         # HTML template
└── app.css          # Global styles
```

## Technology Stack

- **Framework**: SvelteKit 2.x with Svelte 5
- **UI Kit**: Skeleton UI 4.x
- **Icons**: Lucide Svelte
- **Styling**: Tailwind CSS 4.x
- **Build**: Vite 7.x
- **Adapter**: @sveltejs/adapter-static (Static Site Generation)
- **Testing**: Vitest + Playwright
- **Task Runner**: mise

## CI/CD & Security

This project uses GitHub Actions for continuous integration, deployment, and security scanning:

- **Testing**: Automated tests run on every push and pull request
- **Deployment**: Cloudflare Pages deployment via Wrangler CLI
  - Production: `main` branch → `https://fahrenheight.pages.dev`
  - Preview (Next): `next` branch → `https://next.fahrenheight.pages.dev`
  - Preview (Other): Feature branches → Auto-generated preview URLs
- **Security**: CodeQL analysis, Scorecard security checks, and dependency review
- **Quality**: Linting, type-checking, and formatting validation

See [docs/CLOUDFLARE_PAGES_DEPLOYMENT.md](docs/CLOUDFLARE_PAGES_DEPLOYMENT.md) for deployment documentation.

## Learn More

- [SvelteKit Documentation](https://svelte.dev/docs/kit)
- [Svelte 5 Documentation](https://svelte.dev/docs/svelte/overview)
- [mise Documentation](https://mise.jdx.dev/)
