# Fahrenheit Temperature Converter

A static SvelteKit web application demonstrating:

1. Dynamic bidirectional temperature conversion (Celsius ↔ Fahrenheit)
2. Analysis of the approximation formula `(F - 32) / 2 ≈ C` vs the exact formula `(F - 32) * 5/9 = C`

Built with SvelteKit 2.x, Svelte 5, and Tailwind CSS 4.x.

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

This project uses [mise](https://mise.jdx.dev/) for task management.

Start the development server:

```sh
mise dev

# or open in browser automatically
mise dev-open
```

Alternatively, without mise:

```sh
pnpm dev

# or with auto-open
pnpm dev -- --open
```

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

Lint code:

```sh
mise lint
```

Format code:

```sh
mise format
```

Run all CI checks:

```sh
mise ci
```

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
- **Styling**: Tailwind CSS 4.x
- **Build**: Vite 7.x
- **Adapter**: @sveltejs/adapter-static (Static Site Generation)
- **Testing**: Vitest + Playwright
- **Task Runner**: mise

## CI/CD & Security

This project uses GitHub Actions for continuous integration, deployment, and security scanning:

- **Testing**: Automated tests run on every push and pull request
- **Deployment**: Automatic deployment to GitHub Pages on push to `main`
- **Security**: CodeQL analysis, Scorecard security checks, and dependency review
- **Quality**: Linting, type-checking, and formatting validation

See [WORKFLOWS.md](WORKFLOWS.md) for detailed workflow documentation.

## Learn More

- [SvelteKit Documentation](https://svelte.dev/docs/kit)
- [Svelte 5 Documentation](https://svelte.dev/docs/svelte/overview)
- [mise Documentation](https://mise.jdx.dev/)
