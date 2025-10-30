# Fahrenheit Project - Agent Instructions

## Project Overview

This is a static SvelteKit web application for temperature conversion and analysis. The project demonstrates:

1. A dynamic bidirectional temperature converter (Celsius ↔ Fahrenheit)
2. A graph showing the accuracy/error of the approximation formula: `(F - 32) / 2 ≈ C` compared to the exact formula: `(F - 32) * 5/9 = C`

**Key Requirement**: This is a **static site** using `@sveltejs/adapter-static`. All calculations must happen client-side with no server-side rendering or API endpoints.

## Technology Stack

- **Framework**: SvelteKit 2.x with Svelte 5
- **Styling**: Tailwind CSS 4.x
- **Build Tool**: Vite 7.x
- **Package Manager**: pnpm
- **Task Runner**: mise (https://mise.jdx.dev/)
- **Testing**:
    - Unit/Component: Vitest with @vitest/browser
    - E2E: Playwright
- **Language**: TypeScript
- **Adapter**: @sveltejs/adapter-static (SSG - Static Site Generation)

## Project Structure

```
fahrenheight/
├── src/
│   ├── routes/           # SvelteKit routes (pages)
│   │   ├── +page.svelte # Main application page
│   │   └── +layout.svelte
│   ├── lib/              # Reusable components and utilities
│   │   ├── index.ts     # Public exports
│   │   └── components/  # Svelte components
│   ├── app.html         # HTML template
│   └── app.css          # Global styles
├── static/              # Static assets (served as-is)
├── e2e/                 # Playwright E2E tests
└── tests/               # Unit/component tests
```

## Core Features to Implement

### 1. Temperature Converter Component

- **Location**: `src/lib/components/TemperatureConverter.svelte`
- **Functionality**:
    - Two input fields: one for Celsius, one for Fahrenheit
    - Real-time bidirectional conversion as user types
    - Use exact formula: `C = (F - 32) * 5/9` and `F = C * 9/5 + 32`
    - Handle empty inputs gracefully (don't show NaN)
    - Input validation for reasonable temperature ranges
    - Clear, accessible form labels

### 2. Approximation Analysis Graph

- **Location**: `src/lib/components/ApproximationGraph.svelte`
- **Functionality**:
    - Display a graph comparing:
        - Exact Celsius values (from `(F - 32) * 5/9`)
        - Approximation values (from `(F - 32) / 2`)
        - Error/difference between them
    - Default temperature range: -40°F to 120°F (configurable)
    - X-axis: Fahrenheit temperature
    - Y-axis: Celsius temperature or error percentage
    - Consider using a lightweight charting library like:
        - Chart.js with svelte-chartjs
        - D3.js with custom Svelte integration
        - Or a simple SVG-based custom solution
    - Show statistics: max error, average error, RMS error

### 3. Conversion Utilities

- **Location**: `src/lib/utils/temperature.ts`
- **Functions**:

    ```typescript
    // Exact conversions
    export function celsiusToFahrenheit(c: number): number
    export function fahrenheitToCelsius(f: number): number

    // Approximation
    export function fahrenheitToCelsiusApprox(f: number): number

    // Analysis
    export function calculateError(exact: number, approx: number): number
    export function calculatePercentError(exact: number, approx: number): number
    export function generateComparisonData(
        startF: number,
        endF: number,
        step: number
    ): ComparisonData[]
    ```

### 4. Main Page Layout

- **Location**: `src/routes/+page.svelte`
- **Structure**:
    - Page title and description
    - Temperature Converter section (prominently displayed)
    - Approximation Analysis section with graph
    - Optional: Information about the approximation formula and when it's useful
    - Responsive design (mobile-friendly)

## Development Guidelines

### Svelte 5 Syntax

- Use **runes** for reactivity: `$state`, `$derived`, `$effect`, `$props`
- Component props: `let { propName } = $props()`
- Reactive declarations: `let doubled = $derived(count * 2)`
- Effects: `$effect(() => { ... })`
- Event handlers: Use `onclick` instead of `on:click`

### Styling with Tailwind CSS

- Use Tailwind utility classes for all styling
- Follow a consistent design system
- Ensure responsive design with mobile-first approach
- Use semantic color schemes (consider dark mode support)

### Type Safety

- All functions should have proper TypeScript types
- Avoid `any` types
- Export types for shared interfaces
- Use proper typing for component props

### Testing Strategy

1. **Unit Tests** (`*.spec.ts` or `*.test.ts`):
    - Test conversion functions thoroughly
    - Test edge cases (0°, negative temps, extreme values)
    - Test error calculations
2. **Component Tests** (Vitest browser mode):
    - Test converter input/output behavior
    - Test that typing in one field updates the other
    - Test graph rendering with sample data

3. **E2E Tests** (`e2e/*.test.ts`):
    - Test full user journey
    - Test converter functionality end-to-end
    - Verify graph appears and displays data

### Static Site Requirements

- No `+page.server.ts` or `+server.ts` files
- No server-side data fetching
- All data generation happens in the browser
- Use `prerender = true` if needed (it's default with adapter-static)
- Ensure all routes are prerenderable

### Performance Considerations

- Keep calculations efficient (avoid unnecessary recalculations)
- Use `$derived` for computed values
- Debounce graph updates if rendering is expensive
- Lazy load charting library if using one

## Commands

This project uses **mise** for task management. You can run tasks using either `mise run <task>` or the shorthand `mise <task>`.

```bash
# Development
mise dev              # Start dev server
mise dev-open         # Start dev server and open browser

# Building
mise build            # Build static site (output to build/)
mise preview          # Preview production build locally

# Testing
mise test-unit        # Run unit tests (Vitest)
mise test-e2e         # Run E2E tests (Playwright)
mise test             # Run all tests

# Code Quality
mise check            # Type-check with svelte-check
mise check-watch      # Type-check in watch mode
mise lint             # Lint code with ESLint and Prettier
mise format           # Format code with Prettier

# Dependencies & Setup
mise install          # Install dependencies
mise sync             # Sync SvelteKit types

# CI
mise ci               # Run all CI checks (lint, type-check, test)
```

### Alternative: Direct pnpm commands

If you prefer not to use mise, you can still use pnpm directly:

```bash
pnpm dev              # Start dev server
pnpm build            # Build static site
pnpm test             # Run all tests
pnpm lint             # Lint code
pnpm format           # Format code
```

## Charting Library Recommendations

For the approximation graph, consider:

1. **Chart.js** (Recommended for simplicity):
    - Install: `pnpm add chart.js svelte-chartjs`
    - Good for standard line/scatter charts
    - Lightweight and performant

2. **Custom SVG** (Recommended for learning/control):
    - No dependencies
    - Full control over rendering
    - Great for simple line graphs
    - Can use Svelte's reactivity naturally

3. **D3.js** (If complex visualization needed):
    - Install: `pnpm add d3`
    - Powerful but heavier dependency
    - Good for custom, complex visualizations

## Example Temperature Ranges for Analysis

- **Standard Range**: -40°F to 120°F (covers most practical temperatures)
- **Human Comfort**: 32°F to 100°F
- **Extreme Range**: -100°F to 200°F (for comprehensive analysis)

## Accessibility Guidelines

- Use proper semantic HTML
- Ensure form inputs have associated labels
- Add ARIA labels where needed
- Ensure keyboard navigation works
- Provide text alternatives for graph data (table view)
- Maintain sufficient color contrast

## Code Style

- Use consistent formatting (Prettier is configured)
- Follow ESLint rules
- Use descriptive variable names
- Add comments for complex calculations
- Keep components focused and single-purpose

## GitHub Workflows

This project includes several automated workflows:

### 1. Test and Check (`test.yaml`)

- **Trigger**: On every push and pull request
- **Purpose**: Run linting, type-checking, unit tests, and E2E tests
- **Steps**:
    - Lint code with ESLint and Prettier
    - Type-check with svelte-check
    - Run unit tests with Vitest
    - Run E2E tests with Playwright
    - Upload test results as artifacts

### 2. Deploy to GitHub Pages (`deploy.yaml`)

- **Trigger**: On push to `main` branch
- **Purpose**: Build and deploy the static site to GitHub Pages
- **Steps**:
    - Build static site with SvelteKit
    - Upload build artifact
    - Deploy to GitHub Pages
- **Note**: Requires GitHub Pages to be enabled in repository settings

### 3. Scorecard Supply-Chain Security (`scorecard.yaml`)

- **Trigger**: Weekly (Thursdays at 1:30 AM) and on push to `main`
- **Purpose**: Analyze repository for security best practices
- **Steps**:
    - Run OSSF Scorecard analysis
    - Upload results as SARIF
    - Publish to GitHub Security tab
- **Note**: Provides security score and recommendations

### 4. CodeQL Analysis (`codeql.yaml`)

- **Trigger**: On push/PR to `main`, and weekly (Fridays at 7:31 PM)
- **Purpose**: Static code analysis for security vulnerabilities
- **Steps**:
    - Initialize CodeQL for TypeScript
    - Run security and quality queries
    - Upload results to GitHub Security tab
- **Configuration**: Uses security-extended query suite

### 5. Dependency Review (`dependency-review.yaml`)

- **Trigger**: On every pull request
- **Purpose**: Review dependency changes for security issues
- **Steps**:
    - Scan for known vulnerabilities in dependencies
    - Fail on moderate or higher severity issues
    - Block GPL-2.0 and GPL-3.0 licensed dependencies
- **Note**: Helps prevent vulnerable or incompatibly licensed packages

All workflows use:

- **Harden Runner**: Restricts network egress for security
- **Pinned Actions**: All actions are pinned to specific SHA hashes
- **Mise**: For consistent task execution across environments

## Success Criteria

✅ Two-way temperature converter works correctly
✅ Graph displays comparison between exact and approximate conversions
✅ All calculations happen client-side
✅ Site builds as static files (no server required)
✅ Tests pass (unit and E2E)
✅ Responsive design works on mobile and desktop
✅ Type-safe TypeScript throughout
✅ Follows Svelte 5 best practices
✅ Code is well-formatted and linted

## Notes for AI Agents

- Always use exact formulas for conversion, not approximations (except for the approximation analysis)
- Remember this is Svelte 5 - use runes, not legacy `$:` reactive statements
- This is a static site - no server-side code
- Keep the UI simple and focused on the two main features
- Prioritize accuracy in calculations and clarity in presentation
- When implementing the graph, start simple and iterate
- Do not add summary document files unless explicitly requested
