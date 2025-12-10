# Fahrenheit Temperature Converter

> A modern, static web application for temperature conversion and approximation analysis

[![CI Pipeline](https://github.com/AliSajid/fahrenheight/actions/workflows/ci.yaml/badge.svg)](https://github.com/AliSajid/fahrenheight/actions/workflows/ci.yaml)
[![Test Status](https://github.com/AliSajid/fahrenheight/actions/workflows/test.yaml/badge.svg)](https://github.com/AliSajid/fahrenheight/actions/workflows/test.yaml)
[![Deploy Status](https://github.com/AliSajid/fahrenheight/actions/workflows/deploy.yaml/badge.svg)](https://github.com/AliSajid/fahrenheight/actions/workflows/deploy.yaml)
[![CodeQL](https://github.com/AliSajid/fahrenheight/actions/workflows/codeql.yaml/badge.svg)](https://github.com/AliSajid/fahrenheight/actions/workflows/codeql.yaml)
[![OpenSSF Scorecard](https://github.com/AliSajid/fahrenheight/actions/workflows/scorecard.yaml/badge.svg)](https://github.com/AliSajid/fahrenheight/actions/workflows/scorecard.yaml)

[![SonarCloud Quality Gate](https://sonarcloud.io/api/project_badges/measure?project=AliSajid_fahrenheight&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=AliSajid_fahrenheight)
[![SonarCloud Coverage](https://sonarcloud.io/api/project_badges/measure?project=AliSajid_fahrenheight&metric=coverage)](https://sonarcloud.io/summary/new_code?id=AliSajid_fahrenheight)
[![SonarCloud Bugs](https://sonarcloud.io/api/project_badges/measure?project=AliSajid_fahrenheight&metric=bugs)](https://sonarcloud.io/summary/new_code?id=AliSajid_fahrenheight)
[![SonarCloud Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=AliSajid_fahrenheight&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=AliSajid_fahrenheight)

[![GitHub Release](https://img.shields.io/github/v/release/AliSajid/fahrenheight?include_prereleases&logo=github)](https://github.com/AliSajid/fahrenheight/releases)
[![GitHub License](https://img.shields.io/github/license/AliSajid/fahrenheight?logo=opensourceinitiative)](LICENSE)
[![REUSE Compliance](https://api.reuse.software/badge/github.com/AliSajid/fahrenheight)](https://api.reuse.software/info/github.com/AliSajid/fahrenheight)
[![OpenSSF Best Practices](https://www.bestpractices.dev/projects/9999/badge)](https://www.bestpractices.dev/projects/9999)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg?logo=conventionalcommits)](https://conventionalcommits.org)

[![SvelteKit](https://img.shields.io/badge/SvelteKit-2.x-ff3e00?logo=svelte&logoColor=white)](https://svelte.dev/)
[![Svelte](https://img.shields.io/badge/Svelte-5.x-ff3e00?logo=svelte&logoColor=white)](https://svelte.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-06B6D4?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-7.x-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![Cloudflare Pages](https://img.shields.io/badge/Cloudflare_Pages-deployed-F38020?logo=cloudflare&logoColor=white)](https://pages.cloudflare.com/)

[![Node.js](https://img.shields.io/badge/node-22.x-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![pnpm](https://img.shields.io/badge/pnpm-10.x-F69220?logo=pnpm&logoColor=white)](https://pnpm.io/)
[![mise](https://img.shields.io/badge/mise-task_runner-000000)](https://mise.jdx.dev/)
[![Vitest](https://img.shields.io/badge/Vitest-3.x-729B1B?logo=vitest&logoColor=white)](https://vitest.dev/)
[![Playwright](https://img.shields.io/badge/Playwright-1.x-2EAD33?logo=playwright&logoColor=white)](https://playwright.dev/)

## 🌡️ Overview

A **first-party website** - a personal temperature conversion tool built as a static SvelteKit web application. The source code is open source for transparency and as an educational resource demonstrating modern web development practices.

**Features:**

1. **Dynamic Bidirectional Temperature Conversion** (Celsius ↔ Fahrenheit)

   - Real-time conversion as you type
   - Exact mathematical formulas
   - Input validation and error handling

2. **Approximation Analysis & Visualization**
   - Compare approximation formula `(F - 30) / 2 ≈ C` vs exact formula `(F - 32) * 5/9 = C`
   - Interactive graphs showing conversion accuracy
   - Statistical analysis: max error, average error, RMS error

Built with modern web technologies: **SvelteKit 2.x**, **Svelte 5** (with runes), **Tailwind CSS 4.x**, and **Skeleton UI 4.x**.

## ✨ Features

- ⚡ **Lightning Fast**: Static site generation with SvelteKit + Vite
- 🎨 **Modern UI**: Skeleton UI components with Tailwind CSS 4.x
- 🌓 **Dark Mode**: Automatic theme switching support
- 📱 **Responsive**: Mobile-first design, works on all devices
- ♿ **Accessible**: WCAG compliant with proper ARIA labels
- 🔒 **Secure**: Multiple security scanning layers (CodeQL, OSSF Scorecard, SonarCloud)
- 📦 **Zero Dependencies at Runtime**: Pure client-side JavaScript
- 🚀 **Deployed on Cloudflare Pages**: Global CDN with edge locations
- 🔐 **Signed Releases**: GPG signatures and SLSA attestations
- 📊 **Comprehensive Testing**: Unit tests (Vitest) and E2E tests (Playwright)

## 🚀 Using the Application

**Live Application**: Visit the hosted version at the production URL (deployed via Cloudflare Pages).

**For Development/Exploration** (if you want to explore the code or contribute):

### Prerequisites

- [Node.js](https://nodejs.org/) 22.x or higher
- [pnpm](https://pnpm.io/) 10.x package manager
- [mise](https://mise.jdx.dev/) task runner (recommended for development)

### Local Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/AliSajid/fahrenheight.git
   cd fahrenheight
   ```

1. **Install mise (if not already installed)**

   ```bash
   # macOS/Linux
   curl https://mise.run | sh

   # Or via Homebrew
   brew install mise
   ```

1. **Install dependencies**

   ```bash
   # Using mise (recommended)
   mise install

   # Or directly with pnpm
   pnpm install
   ```

## 🛠️ Development

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

## 🏗️ Technology Stack

### Frontend

- **Framework**: [SvelteKit](https://svelte.dev/) 2.x with [Svelte 5](https://svelte.dev/docs/svelte/overview) (runes)
- **UI Components**: [Skeleton UI](https://www.skeleton.dev/) 4.x
- **Icons**: [Lucide Svelte](https://lucide.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) 4.x
- **Build Tool**: [Vite](https://vite.dev/) 7.x
- **Language**: [TypeScript](https://www.typescriptlang.org/) 5.x

### Development & Tooling

- **Package Manager**: [pnpm](https://pnpm.io/) 10.x
- **Task Runner**: [mise](https://mise.jdx.dev/)
- **Version Control**: [Cocogitto](https://github.com/cocogitto/cocogitto) (conventional commits)
- **Testing**:
  - Unit/Component: [Vitest](https://vitest.dev/) 3.x with [@vitest/browser](https://vitest.dev/guide/browser/)
  - E2E: [Playwright](https://playwright.dev/) 1.x
- **Code Quality**:
  - Linting: [ESLint](https://eslint.org/) 9.x with TypeScript support
  - Formatting: [Prettier](https://prettier.io/) 3.x
  - Type Checking: [svelte-check](https://github.com/sveltejs/language-tools)

### Deployment & Infrastructure

- **Hosting**: [Cloudflare Pages](https://pages.cloudflare.com/)
- **Adapter**: [@sveltejs/adapter-static](https://kit.svelte.dev/docs/adapter-static)
- **CDN**: Cloudflare global network
- **Deployment Tool**: [Wrangler](https://developers.cloudflare.com/workers/wrangler/) CLI

### Security & Quality

- **Code Analysis**: [SonarCloud](https://sonarcloud.io/)
- **Security Scanning**: [CodeQL](https://codeql.github.com/)
- **Supply Chain Security**: [OSSF Scorecard](https://securityscorecards.dev/)
- **Dependency Scanning**: GitHub Dependency Review
- **License Compliance**: [REUSE](https://reuse.software/) 3.0 specification

## 🔄 CI/CD Pipeline

This project implements a comprehensive CI/CD pipeline with multiple stages:

### Pipeline Stages

1. **Test** - Comprehensive quality checks

   - ESLint and Prettier validation
   - TypeScript type checking with svelte-check
   - Unit tests with Vitest (browser mode)
   - E2E tests with Playwright

2. **Build & Package** - Static site generation

   - Builds production-ready static assets
   - Creates compressed artifacts
   - Generates artifact digests for provenance

3. **Release** - Automated versioning and release creation

   - Semantic versioning via Cocogitto (conventional commits)
   - GPG-signed releases
   - SLSA build provenance attestations
   - Automatic changelog generation

4. **Deploy** - Multi-environment deployment
   - Production: `main` branch → `https://fahrenheight.banseljaj.com`
   - Preview: `next` branch → `https://next.fahrenheight.banseljaj.com`
   - Dev: Feature branches → Manual trigger for dev releases

### Security Scanning

- **CodeQL**: Automated security vulnerability detection
- **OSSF Scorecard**: Supply chain security assessment
- **SonarCloud**: Code quality and security analysis
- **Dependency Review**: Blocks vulnerable or incompatible dependencies

### Release Types

- **Stable** (`main` branch): Production releases with semantic versioning
- **Next** (`next` branch): Pre-release versions with `-next` suffix
- **Dev** (feature branches): Development builds with `-dev.{timestamp}+{sha}` suffix

### Security Features

- **Harden Runner**: Network egress restrictions on all workflows
- **Action Pinning**: All GitHub Actions pinned to SHA hashes
- **GPG Signing**: All releases digitally signed
- **SLSA Attestations**: Build provenance for supply chain verification
- **Secret Scanning**: Automated detection of exposed secrets

## 🔐 Security

Security is a top priority for this project. We implement multiple layers of security controls:

- **Automated Security Scanning**: CodeQL, OSSF Scorecard, SonarCloud
- **Signed Releases**: All releases include GPG signatures and SLSA attestations
- **Dependency Monitoring**: Automated vulnerability scanning and updates
- **Secure CI/CD**: Hardened workflows with network egress restrictions

### Reporting Security Vulnerabilities

If you discover a security vulnerability, please email [security@imamiland.com](mailto:security@imamiland.com) with details. We will respond within 48 hours and provide a detailed response within 5 business days.

For more information, see our [Security Policy](SECURITY.md).

### Release Verification

All releases are signed and can be verified. See [SECURITY.md](SECURITY.md) for verification instructions.

## 🤝 Contributing

**Project Context**: This is a first-party website project - a personal tool maintained by the repository owner. The source code is open for transparency and educational purposes.

**Contributions Welcome**: While this is primarily a personal project, contributions are appreciated, especially:

- Bug fixes and security improvements
- Documentation enhancements
- Code quality and accessibility improvements
- Performance optimizations

Please note that feature requests may be limited to the core temperature conversion purpose. The project owner maintains final decision on all changes.

For detailed information, see [Contributing Guidelines](CONTRIBUTING.md).

### Quick Start for Contributors

1. Read the [Code of Conduct](CODE_OF_CONDUCT.md)
2. Check existing [Issues](https://github.com/AliSajid/fahrenheight/issues) and [Pull Requests](https://github.com/AliSajid/fahrenheight/pulls)
3. Fork the repository and create a feature branch
4. Make your changes following our [Style Guide](CONTRIBUTING.md#style-guides)
5. Run `mise ci` to validate your changes
6. Submit a pull request with a clear description

For security vulnerabilities, please email [security@imamiland.com](mailto:security@imamiland.com) instead of opening a public issue.

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE-MIT](LICENSE-MIT) file for details.

The project follows the [REUSE 3.0 specification](https://reuse.software/) for comprehensive license compliance. All source code files include SPDX license identifiers.

## 🙏 Acknowledgments

- Built with [SvelteKit](https://svelte.dev/) and [Svelte 5](https://svelte.dev/)
- UI components from [Skeleton UI](https://www.skeleton.dev/)
- Icons from [Lucide](https://lucide.dev/)
- Hosted on [Cloudflare Pages](https://pages.cloudflare.com/)
- Security scanning by [CodeQL](https://codeql.github.com/) and [SonarCloud](https://sonarcloud.io/)

## 📚 Documentation

### Project Documentation

- [Contributing Guidelines](CONTRIBUTING.md) - How to contribute to the project
- [Code of Conduct](CODE_OF_CONDUCT.md) - Community standards and expectations
- [Security Policy](SECURITY.md) - Security practices and vulnerability reporting
- [Governance](GOVERNANCE.md) - Project governance and decision-making
- [Security Review](SECURITY_REVIEW.md) - Comprehensive security assessment
- [Security Assurance](SECURITY_ASSURANCE.md) - Security assurance case

### Technology Documentation

- [SvelteKit Documentation](https://svelte.dev/docs/kit) - Learn about SvelteKit features
- [Svelte 5 Documentation](https://svelte.dev/docs/svelte/overview) - Explore Svelte 5 runes
- [mise Documentation](https://mise.jdx.dev/) - Task runner and tool manager
- [Conventional Commits](https://www.conventionalcommits.org/) - Commit message format
- [REUSE Specification](https://reuse.software/spec/) - License compliance
- [SLSA Framework](https://slsa.dev/) - Supply chain security
- [OpenSSF Best Practices](https://www.bestpractices.dev/) - Open source security criteria

## 📞 Contact & Support

- **Issues & Bugs**: [GitHub Issues](https://github.com/AliSajid/fahrenheight/issues)
- **Questions & Discussions**: [GitHub Discussions](https://github.com/AliSajid/fahrenheight/discussions)
- **Security Vulnerabilities**: [security@imamiland.com](mailto:security@imamiland.com) - see [SECURITY.md](SECURITY.md)
- **Contributing**: See [CONTRIBUTING.md](CONTRIBUTING.md)
- **Code of Conduct**: See [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)
- **Governance**: See [GOVERNANCE.md](GOVERNANCE.md)

---

<div align="center">

Made with ❤️ by [Ali Sajid Imami](https://github.com/AliSajid)

⭐ Star this repository if you find it helpful!

</div>
