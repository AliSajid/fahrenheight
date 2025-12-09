# Fahrenheit Project - Agent Instructions

## Project Overview

This is a static SvelteKit web application for temperature conversion and analysis. The project demonstrates:

1. A dynamic bidirectional temperature converter (Celsius ↔ Fahrenheit)
2. A graph showing the accuracy/error of the approximation formula: `(F - 30) / 2 ≈ C` compared to the exact formula: `(F - 32) * 5/9 = C`

**Key Requirement**: This is a **static site** using `@sveltejs/adapter-static`. All calculations must happen client-side with no server-side rendering or API endpoints.

## Technology Stack

### Core Stack

- **Framework**: SvelteKit 2.x with Svelte 5
- **UI Kit**: Skeleton UI 4.x (@skeletonlabs/skeleton + @skeletonlabs/skeleton-svelte)
- **Icons**: Lucide Svelte (@lucide/svelte)
- **Styling**: Tailwind CSS 4.x
- **Build Tool**: Vite 7.x
- **Package Manager**: pnpm 10.x
- **Task Runner**: mise (https://mise.jdx.dev/)
- **Testing**:
  - Unit/Component: Vitest 3.x with @vitest/browser
  - E2E: Playwright 1.x
- **Language**: TypeScript 5.x
- **Adapter**: @sveltejs/adapter-static (SSG - Static Site Generation)

### Deployment & Infrastructure

- **Hosting**: Cloudflare Pages
  - Production: `main` branch → production environment
  - Preview: `next` branch → preview environment
- **CDN Configuration**: Managed via `wrangler.toml`

### Development Tools

- **Version Management**: Cocogitto (cog) - Conventional Commits enforcement
- **Code Quality**:
  - ESLint 9.x with TypeScript support
  - Prettier 3.x with Svelte, Tailwind, and multiline array plugins
  - svelte-check for type checking
- **Security Analysis**:
  - SonarQube/SonarCloud - Code quality and security scanning
  - CodeQL - Security vulnerability detection
  - OSSF Scorecard - Supply chain security assessment
  - Dependency Review - Vulnerability and license compliance
- **License Compliance**: REUSE 3.0 specification
- **Dependency Updates**: Renovate bot

## Project Structure

```
fahrenheight/
├── .github/
│   ├── actions/
│   │   └── release-core/ # Composite action for release workflow
│   └── workflows/        # GitHub Actions workflows
│       ├── ci.yaml              # Main CI/CD pipeline orchestrator
│       ├── test.yaml            # Test runner (unit + E2E)
│       ├── build-and-package.yaml # Build and artifact creation
│       ├── release.yaml         # Release creation and signing
│       ├── deploy.yaml          # Deployment to hosting platforms
│       ├── sonarqube.yaml       # SonarQube code analysis
│       ├── codeql.yaml          # CodeQL security analysis
│       ├── scorecard.yaml       # OSSF Scorecard security checks
│       └── dependency-review.yaml # Dependency vulnerability scanning
├── src/
│   ├── routes/           # SvelteKit routes (pages)
│   │   ├── +page.svelte  # Main application page
│   │   ├── +layout.svelte # Root layout
│   │   └── +layout.ts    # Layout configuration
│   ├── lib/              # Reusable components and utilities
│   │   ├── index.ts      # Public exports
│   │   ├── components/   # Svelte components
│   │   └── assets/       # Shared assets
│   ├── app.html          # HTML template
│   ├── app.d.ts          # TypeScript declarations
│   └── app.css           # Global styles
├── static/               # Static assets (served as-is)
│   └── robots.txt
├── build/                # Production build output (git-ignored)
├── e2e/                  # Playwright E2E tests
│   └── demo.test.ts
├── LICENSES/             # License texts for REUSE compliance
│   ├── CC0-1.0.txt
│   └── MIT.txt
├── styles/               # Style configuration and dictionaries
│   └── config/
│       └── vocabularies/
├── cog.toml              # Cocogitto (conventional commits) configuration
├── wrangler.toml         # Cloudflare Pages/Workers configuration
├── sonar-project.properties # SonarQube/SonarCloud configuration
├── REUSE.toml            # REUSE software licensing configuration
├── renovate.json         # Renovate dependency updates configuration
└── test-results/         # Test output directory
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
    - Approximation values (from `(F - 30) / 2`)
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
  export function generateComparisonData(startF: number, endF: number, step: number): ComparisonData[]
  ```

### 4. Logger Utility

- **Location**: `src/lib/utils/logger.ts`
- **Purpose**: Development-only logging that automatically suppresses output in production
- **Usage**:

  ```typescript
  import { logger } from '$lib/utils/logger'

  // These only log in development (import.meta.env.DEV === true)
  logger.log('Debug message', data)
  logger.debug('Debugging info')
  logger.info('Information')
  logger.warn('Warning message')

  // Errors always log, even in production
  logger.error('Error message', error)
  ```

- **Implementation**: Uses `import.meta.env.DEV` (Vite) to detect environment
- **Best Practice**: Always use `logger` instead of direct `console.*` calls to prevent debug output in production builds

### 5. Main Page Layout

- **Location**: `src/routes/+page.svelte`
- **Structure**:
  - Page title and description
  - Temperature Converter section (prominently displayed)
  - Approximation Analysis section with graph
  - Optional: Information about the approximation formula and when it's useful
  - Responsive design (mobile-friendly)

## Component Architecture

### Layout Components

#### Navbar Component

- **Location**: `src/lib/components/Navbar.svelte`
- **Purpose**: Sticky navigation bar with brand and page links
- **Key Features**:
  - Opaque theme-adaptive background: `bg-white dark:bg-surface-900`
  - Sticky positioning with `sticky top-0 z-50`
  - Uses ColoredIcon for thermometer brand icon
  - Uses NavLink component for navigation items
  - Hover effects: `hover:text-primary-500`
- **Sub-components**:
  - `NavLink.svelte`: Reusable navigation link with active state detection

#### NavLink Component

- **Location**: `src/lib/components/NavLink.svelte`
- **Purpose**: Navigation link with active state highlighting
- **Key Features**:
  - Props: `href`, `label`
  - Active state derived from `$page.url.pathname`
  - Conditional styling: `text-primary-500` when active, `text-surface-600-300-token` when inactive
  - Hover effects and transitions

#### Footer Component

- **Location**: `src/lib/components/Footer.svelte`
- **Purpose**: Fixed footer with tech stack, attribution, and links
- **Key Features**:
  - Opaque theme-adaptive background: `bg-white dark:bg-surface-900`
  - Three-column grid layout: `grid grid-cols-1 sm:grid-cols-3`
  - Fixed positioning: `fixed bottom-0 left-0 right-0`
  - Tech Stack section: Lists TypeScript, SvelteKit, Tailwind CSS, Skeleton UI
  - Attribution section: "Built with passion, love, and work" with emotion icons
  - Source Code section: Link to GitHub repository
  - Bullet separators between tech stack items
  - All icons sized at 16px for consistency

**Important**: Use opaque backgrounds (`bg-white dark:bg-surface-900`) instead of semi-transparent tokens (`bg-surface-50-900-token`) to prevent content visibility when scrolling.

### Icon Components

#### ColoredIcon Component

- **Location**: `src/lib/components/ColoredIcon.svelte`
- **Purpose**: Display icons with brand-specific colors
- **Key Features**:
  - Supports Lucide icons and Simple Icons
  - Brand color mapping for technologies (TypeScript: #3178C6, Svelte: #FF3E00, etc.)
  - color priority: custom prop > brand map > currentColor
  - Size prop (default: 16)
  - Inline style for color application

#### TechStackIcon Component

- **Location**: `src/lib/components/TechStackIcon.svelte`
- **Purpose**: Clickable icon links for technology stack
- **Key Features**:
  - Wraps ColoredIcon with link functionality
  - External links with `target="_blank" rel="noopener noreferrer"`
  - Hover opacity effect: `opacity-70 hover:opacity-100`
  - Accessibility: aria-label and sr-only text
  - Default size: 16px

### Temperature Converter Components

#### TemperatureConverter Component

- **Location**: `src/lib/components/TemperatureConverter.svelte`
- **Purpose**: Main temperature conversion interface with results display
- **Key Features**:
  - Uses ColoredIcon for thermometer header icon
  - Uses TemperatureInput sub-component for input and unit selection
  - State management with `$state` and `$derived` runes
  - Input validation: checks for valid numbers and max 2 decimal places
  - Displays three result cards: Exact Conversion, Approximate Conversion, Percentage Difference
  - Color-coded results: `variant-filled-warning` for >5% difference, `variant-filled-success` for ≤5%
  - Error messages in red (`text-error-500`)
- **Validation Logic**:
  - `hasInput`: Checks if input is not empty
  - `hasValidDecimals`: Ensures max 2 decimal places using regex
  - `validationError`: Returns specific error messages or null
- **Event Handlers**: `handleValueChange`, `handleUnitChange` to manage child component state

#### TemperatureInput Component

- **Location**: `src/lib/components/TemperatureInput.svelte`
- **Purpose**: Input field with unit selection buttons
- **Key Features**:
  - Props: `value`, `activeUnit`, `onValueChange`, `onUnitChange`
  - Text input with `inputmode="decimal"` for mobile keyboards
  - Button group with °C and °F buttons
  - Conditional styling with `class:preset-filled-primary-500`
  - Uses Skeleton UI `btn-group preset-filled-surface-200-800`
  - Responsive layout: input uses `flex-1`, button group also `flex-1`
- **Usage Pattern**:
  ```svelte
  <TemperatureInput
      value={inputValue}
      {activeUnit}
      onValueChange={handleValueChange}
      onUnitChange={handleUnitChange}
  />
  ```

### Icon Libraries

- **Lucide Svelte**: Import from `'@lucide/svelte'` for UI icons

  - Examples: Thermometer, Heart, Flame, Wrench
  - Usage: `import { Thermometer } from '@lucide/svelte'`

- **Simple Icons**: Import from `'@icons-pack/svelte-simple-icons'`
  - Examples: TypeScript, Svelte, GitHub, Tailwind CSS
  - Usage: `import { SiTypescript as TypeScript } from '@icons-pack/svelte-simple-icons'`
  - Note: Use aliases for cleaner component names

## Development Guidelines

### Svelte 5 Syntax

- Use **runes** for reactivity: `$state`, `$derived`, `$effect`, `$props`
- Component props: `let { propName } = $props()`
- Reactive declarations: `let doubled = $derived(count * 2)`
- Effects: `$effect(() => { ... })`
- Event handlers: Use `onclick` instead of `on:click`

### Styling with Skeleton UI and Tailwind CSS

- **Use Skeleton UI components** for consistent UI elements (buttons, cards, forms, etc.)
- **Skeleton UI Classes**:
  - Typography: `h1`, `h2`, `h3` for headings
  - Buttons: `btn`, `btn-lg` for sizing
  - Button variants: Use `preset-filled-*` not `variant-filled-*`
    - Example: `preset-filled-primary-500`, `preset-filled-surface-200-800`
  - Cards: `card`, `variant-glass-surface`, `variant-ghost`, `variant-filled-primary`, `variant-filled-secondary`, `variant-filled-warning`, `variant-filled-success`
  - Conditional classes: Use `class:preset-filled-primary-500={condition}` syntax
  - Button groups: `btn-group preset-filled-surface-200-800`
  - Color tokens: `text-primary-500`, `text-error-500`, `text-surface-600-300-token` (dark mode aware)
- **Icons**: Use ColoredIcon wrapper for consistent icon handling with brand colors
- **Tailwind utilities**: Use for spacing, layout, and custom styling
- **Responsive design**: Mobile-first approach with Tailwind breakpoints
- **Dark mode**: Skeleton UI provides automatic dark mode support via color tokens
- **Input types**: Use `type="text"` with `inputmode="decimal"` for numeric inputs (allows validation of letters)

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
   - **Use vitest-browser-svelte patterns**: `render()` returns `{ container }`, use `container.querySelector()`
   - **Use page locators for browser tests**: `page.getByRole()`, `page.getByText()`, etc.

3. **E2E Tests** (`e2e/*.test.ts`):
   - Test full user journey
   - Test converter functionality end-to-end
   - Verify graph appears and displays data

### Test Consolidation Guidelines

**Philosophy**: Write fewer, more comprehensive tests that focus on component-specific concerns.

**Key Principles**:

1. **Don't test downstream components** - If ColoredIcon tests handle colors, TechStackIcon doesn't need to test colors again
2. **Consolidate related assertions** - Test multiple properties of the same rendered element in one test
3. **Test integration, not implementation** - Focus on how components work together
4. **Use loops for repetitive checks** - Test multiple similar items in a single test with forEach or for loops
5. **Group by feature, not by property** - Test all aspects of a feature together

**Examples of Good Consolidation**:

- **Before**: 4 separate tests for span, classList, SVG, size prop
- **After**: 1 test checking all rendering aspects together

- **Before**: 13 tests for each brand color (one per technology)
- **After**: 1 test with array of test cases, loop through validating each

- **Before**: Separate tests for href, target, rel attributes on same link
- **After**: 1 test checking all link attributes together

**Component Test Consolidation Results**:

- ColoredIcon: 27 tests → 4 tests (component structure, brand colors, color priority, styling)
- TechStackIcon: 48 tests → 13 tests (removed redundant downstream tests)
- Footer: 35+ tests → 5 tests (structure, tech stack, attribution, source code, styling)
- Navbar: 16 tests → 2 tests (structure/navigation, styling/layout)
- NavLink: 4 focused tests (rendering, active state, callbacks)
- TemperatureConverter: 34 tests → 6 tests (structure, unit selection, conversions, input handling, reactive updates)
- TemperatureInput: 4 tests (rendering, value display, value change, unit change)

**Test File Naming**: Use `*.spec.ts` for component tests co-located with components

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

This project uses **mise** as the primary task runner. All commands are defined in `mise.toml` and execute directly using `pnpm exec` without relying on package.json scripts.

You can run tasks using either `mise run <task>` or the shorthand `mise <task>`.

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
mise lint             # Lint and check code (Prettier + ESLint)
mise lint:check       # Same as lint (alias)
mise format           # Format code with Prettier (write changes)
mise format:check     # Check formatting (no changes)

# Dependencies & Setup
mise install          # Install dependencies
mise sync             # Sync SvelteKit types

# CI
mise ci               # Run all CI checks (lint:check, format:check, check, test)
```

### Important: Mise-First Approach

**Do NOT use pnpm scripts directly.** The `package.json` only contains the `prepare` lifecycle hook for SvelteKit type generation. All development tasks must be run through mise to ensure consistency across local development, CI/CD, and pre-commit hooks.

All mise tasks execute commands directly:

- Example: `mise dev` runs `pnpm exec vite dev` (not `pnpm dev`)
- This ensures commands are explicit and not dependent on package.json scripts
- Changes to task definitions only need to be made in `mise.toml`

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
- Use spaces over tabs

## CI/CD Pipeline Architecture

This project implements a comprehensive CI/CD pipeline with multiple stages and workflows orchestrated through GitHub Actions.

### Pipeline Overview (`ci.yaml`)

The main CI/CD orchestrator that coordinates all stages:

- **Trigger**: Every push and manual workflow dispatch
- **Manual Options**: Can trigger dev release builds via workflow dispatch
- **Release Types**:
  - `stable`: Production releases from `main` branch
  - `next`: Pre-releases from `next` branch
  - `dev`: Development builds from feature branches (manual trigger)
  - `none`: Build-only, no release (all other branches)

**Pipeline Stages**:

1. **Determine Release Type** → Identifies target release channel based on branch
2. **Test** → Runs all quality checks and tests
3. **Build & Package** → Creates production artifacts
4. **Release** → Creates GitHub release with signing and attestation (if release type != none)
5. **Deploy** → Deploys to Cloudflare Pages (if release type != none)

### 1. Test Workflow (`test.yaml`)

- **Trigger**: Called by CI pipeline, also runs on push/PR
- **Purpose**: Comprehensive code quality and testing
- **Jobs**:
  - **Lint & Format**: ESLint and Prettier checks
  - **Type Check**: svelte-check for TypeScript validation
  - **Unit Tests**: Vitest browser mode tests
  - **E2E Tests**: Playwright end-to-end tests
  - **Upload Results**: Test artifacts for debugging
- **Security**: Harden Runner with restricted network egress
- **Tools**: mise for consistent task execution

### 2. Build and Package Workflow (`build-and-package.yaml`)

- **Trigger**: Called by CI pipeline after tests pass
- **Purpose**: Build static site and create artifacts
- **Outputs**:
  - `artifact-id`: GitHub artifact identifier
  - `artifact-digest`: SHA256 digest for provenance
- **Steps**:
  - Install dependencies with mise
  - Sync SvelteKit types
  - Build static site (`build/` directory)
  - Upload compressed artifact (retention: 1 day)
- **Artifact Configuration**:
  - Compression level: 9 (maximum)
  - Fails if build directory is empty

### 3. Release Workflow (`release.yaml`)

- **Trigger**: Called by CI pipeline for stable/next/dev releases
- **Permissions**: Requires write access to contents, attestations, id-token
- **Purpose**: Create signed, attested GitHub releases
- **Uses**: Composite action `.github/actions/release-core`

**Release Core Composite Action** (`release-core/action.yaml`):

A comprehensive release preparation and publishing action that:

**Inputs**:

- `artifact_id`: Build artifact to release
- `artifact_digest`: Artifact digest for provenance
- `release_type`: stable | next | dev
- `gpg_private_key`: For signing releases
- `gpg_passphrase`: GPG key passphrase
- `github_token`: For creating releases

**Process**:

1. **Version Computation**:
   - Uses Cocogitto (cog) for semantic versioning
   - `stable`: Auto-bump based on conventional commits
   - `next`: Auto-bump with `-next` prerelease suffix
   - `dev`: Patch bump with `-dev.{timestamp}+{sha}` suffix
   - Updates `package.json` version automatically
2. **Artifact Preparation**:
   - Downloads build artifact
   - Creates versioned zip file: `fahrenheight-{version}.zip`
   - Generates SHA256 checksums
3. **Signing**:
   - Imports GPG key
   - Creates detached GPG signature (`.asc` file)
   - Verifies signature integrity
4. **SLSA Attestation**:
   - Generates build provenance attestation
   - Links artifact to build process
   - Enables supply chain verification
5. **Release Notes**:
   - Generates changelog from conventional commits
   - Includes verification instructions
   - Documents GPG signature and SLSA attestation usage
6. **GitHub Release**:
   - Creates tagged release
   - Uploads: zip, signature, checksums
   - Marks as prerelease for next/dev
   - Fails if any files are missing

**Outputs**:

- `release_version`: Computed semantic version
- `release_name`: Display name (fahrenheight-{version})
- `artifact_file`: Final artifact filename

### 4. Deploy Workflow (`deploy.yaml`)

- **Trigger**: Called by CI pipeline after successful release
- **Purpose**: Deploy to Cloudflare Pages
- **Configuration**:
  - Uses `wrangler.toml` for deployment settings
  - `stable` → production environment
  - `next` → preview environment (requires custom domain setup)
  - `dev` → preview deployment
- **Requirements**:
  - `CLOUDFLARE_API_TOKEN` secret
  - `CLOUDFLARE_ACCOUNT_ID` secret
- **Process**:
  - Downloads versioned artifact
  - Deploys to Cloudflare Pages via Wrangler
  - Provides deployment URL

### 5. Security Scanning Workflows

#### SonarQube Analysis (`sonarqube.yaml`)

- **Trigger**: Push to `main`/`next`, all PRs
- **Purpose**: Code quality and security analysis
- **Configuration**: `sonar-project.properties`
- **Organization**: alisajid
- **Project**: AliSajid_fahrenheight
- **Requirements**: `SONAR_TOKEN` secret

#### CodeQL Analysis (`codeql.yaml`)

- **Trigger**: Push/PR to `main`, weekly schedule
- **Purpose**: Security vulnerability detection
- **Language**: TypeScript analysis
- **Query Suite**: security-extended
- **Results**: Published to Security tab

#### OSSF Scorecard (`scorecard.yaml`)

- **Trigger**: Weekly (Thursdays), push to `main`
- **Purpose**: Supply chain security assessment
- **Checks**: Branch protection, dependency updates, code review, etc.
- **Results**: SARIF uploaded to Security tab

#### Dependency Review (`dependency-review.yaml`)

- **Trigger**: Every pull request
- **Purpose**: Dependency vulnerability and license scanning
- **Policy**:
  - Fail on moderate+ severity vulnerabilities
  - Block GPL-2.0 and GPL-3.0 licenses
  - Allow other open source licenses
- **Prevents**: Vulnerable or incompatibly licensed dependencies from merging

### Workflow Security Features

All workflows implement comprehensive security measures:

1. **Harden Runner** (step-security/harden-runner):

   - Restricts network egress to allowed endpoints
   - Prevents unauthorized network access
   - Audits network activity
   - Blocks supply chain attacks

2. **Action Pinning**:

   - All actions pinned to specific SHA hashes
   - Prevents malicious action updates
   - Example: `actions/checkout@11bd71901bbe5b1630ceea73d27597364c9af683`

3. **Minimal Permissions**:

   - Principle of least privilege
   - Explicit permission declarations per job
   - Read-only by default

4. **Secret Management**:

   - Secrets marked with `# pragma: allowlist secret` comment
   - No secrets in logs or outputs
   - GPG keys for signing
   - API tokens for deployments

5. **Artifact Integrity**:
   - SHA256 checksums for all artifacts
   - GPG signatures for releases
   - SLSA attestations for provenance
   - Artifact digests tracked through pipeline

### Version Management & Conventional Commits

**Cocogitto Configuration** (`cog.toml`):

- **Versioning**: Semantic versioning with conventional commits
- **Profiles**:
  - `default`: Stable releases on main branch
  - `next`: Prerelease versions with `-next` suffix
  - `dev`: Development builds with timestamp and SHA
- **Changelog**: Automatic generation from commit history
- **Hooks**: Pre/post bump hooks for package.json updates
- **Note**: Version bumping now handled by GitHub Actions (release-core), local hooks for development only

**Conventional Commit Enforcement**:

- Required for proper semantic versioning
- Types: feat, fix, docs, style, refactor, test, chore, etc.
- Breaking changes: Include `BREAKING CHANGE:` in commit footer
- Scope: Optional, e.g., `feat(converter): add celsius support`

### Deployment Targets

**Cloudflare Pages** (`wrangler.toml`):

- **Production**: `main` branch
  - Environment: `production`
  - Domain: `fahrenheight.banseljaj.com` (or default Pages domain)
- **Preview**: `next` branch
  - Environment: `preview`
  - Custom domain: `next.fahrenheight.banseljaj.com` (configure in dashboard)
- **Features**:
  - Source map uploads enabled
  - Compatibility date: 2025-11-04
  - Static site serving from `build/` directory

### CI/CD Best Practices

1. **Fail Fast**: Tests run before builds
2. **Artifact Reuse**: Build once, deploy multiple times
3. **Parallel Execution**: Independent jobs run concurrently
4. **Caching**: Node modules and mise tools cached
5. **Conditional Execution**: Release/deploy only for appropriate branches
6. **Comprehensive Logging**: Debug output in all critical steps
7. **Rollback Support**: Tagged releases enable easy rollback
8. **Security First**: Multiple scanning layers before deployment

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
- When making changes, do not try to commit ot push changes on your own.
