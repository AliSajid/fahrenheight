# Mise Tasks Quick Reference

This project uses [mise](https://mise.jdx.dev/) as a task runner. All tasks are defined in `mise.toml`.

## Running Tasks

Use either of these formats:

```bash
mise run <task-name>
mise <task-name>      # shorthand
```

## Available Tasks

### Development

| Task       | Command         | Description                                         |
| ---------- | --------------- | --------------------------------------------------- |
| `dev`      | `mise dev`      | Start development server on <http://localhost:5173> |
| `dev-open` | `mise dev-open` | Start dev server and open browser automatically     |

### Building

| Task      | Command        | Description                                           |
| --------- | -------------- | ----------------------------------------------------- |
| `build`   | `mise build`   | Build static site for production (output to `build/`) |
| `preview` | `mise preview` | Preview production build locally                      |

### Testing

| Task        | Command          | Description                   |
| ----------- | ---------------- | ----------------------------- |
| `test`      | `mise test`      | Run all tests (unit + E2E)    |
| `test-unit` | `mise test-unit` | Run unit tests with Vitest    |
| `test-e2e`  | `mise test-e2e`  | Run E2E tests with Playwright |

### Code Quality

| Task          | Command            | Description                           |
| ------------- | ------------------ | ------------------------------------- |
| `check`       | `mise check`       | Type-check with svelte-check          |
| `check-watch` | `mise check-watch` | Type-check in watch mode              |
| `lint`        | `mise lint`        | Lint with ESLint and Prettier         |
| `format`      | `mise format`      | Format code with Prettier             |
| `ci`          | `mise ci`          | Run all CI checks (lint, check, test) |

### Setup & Dependencies

| Task      | Command        | Description               |
| --------- | -------------- | ------------------------- |
| `install` | `mise install` | Install pnpm dependencies |
| `sync`    | `mise sync`    | Sync SvelteKit types      |

## Common Workflows

### Start developing

```bash
mise install    # First time only
mise dev-open   # Start coding!
```

### Before committing

```bash
mise format     # Format code
mise lint       # Check for issues
mise check      # Type-check
mise test       # Run tests
```

Or run everything at once:

```bash
mise ci         # Runs: lint → check → test
```

### Build for production

```bash
mise build      # Creates static files in build/
mise preview    # Test the production build
```

## Customization

To customize mise tasks for your local environment:

1. Copy `.mise.local.toml.example` to `.mise.local.toml`
2. Edit `.mise.local.toml` with your custom settings
3. This file is gitignored and won't be committed

## Alternative: Using pnpm directly

If you prefer not to use mise, you can run tasks directly with pnpm:

```bash
pnpm dev
pnpm build
pnpm test
pnpm lint
pnpm format
```

See `package.json` for all available pnpm scripts.
