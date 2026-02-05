<!--
SPDX-FileCopyrightText: 2024 - 2025 Ali Sajid Imami

SPDX-License-Identifier: MIT
-->

<!-- omit in toc -->

# Contributing to Fahrenheit Temperature Converter

First off, thanks for taking the time to contribute! ❤️

**Note**: This is a first-party website project (personal temperature converter tool) maintained primarily by the repository owner. The source code is open for transparency and educational purposes. While contributions are welcome, please understand that this project serves a specific use case and may have limited scope for new features.

Contributions that are most valuable:

- Bug reports and fixes
- Security improvements
- Documentation enhancements
- Code quality improvements
- Accessibility enhancements

> If you like the project but don't have time to contribute:
>
> - Star the project
> - Share it on social media
> - Reference it in your own projects as an example
> - Mention it when discussing SvelteKit or static site projects

<!-- omit in toc -->

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [I Have a Question](#i-have-a-question)
- [I Want To Contribute](#i-want-to-contribute)
  - [Reporting Bugs](#reporting-bugs)
  - [Suggesting Enhancements](#suggesting-enhancements)
  - [Your First Code Contribution](#your-first-code-contribution)
  - [Improving The Documentation](#improving-the-documentation)
- [Style Guides](#style-guides)
  - [Commit Messages](#commit-messages)
- [Governance](#governance)
- [Attribution](#attribution)

## Code of Conduct

This project and everyone participating in it is governed by the
[Fahrenheit Temperature Converter Code of Conduct](CODE_OF_CONDUCT.md).
By participating, you are expected to uphold this code. Please report unacceptable behavior
to [contact@imamiland.com](mailto:contact@imamiland.com).

## I Have a Question

> If you want to ask a question, we assume that you have read the available [Documentation](README.md).

Before you ask a question, it is best to search for existing [Issues](https://github.com/AliSajid/fahrenheight/issues) that might help you. In case you have found a suitable issue and still need clarification, you can write your question in this issue. It is also advisable to search the internet for answers first.

If you then still feel the need to ask a question and need clarification, we recommend the following:

- Open an [Issue](https://github.com/AliSajid/fahrenheight/issues/new).
- Provide as much context as you can about what you're running into.
- Provide project and platform versions (Node.js, pnpm, browser, etc.), depending on what seems relevant.

We will then take care of the issue as soon as possible.

## I Want To Contribute

> ### Legal Notice <!-- omit in toc -->
>
> When contributing to this project, you must agree that you have authored 100% of the content, that you have the necessary rights to the content and that the content you contribute may be provided under the project license.

### Reporting Bugs

<!-- omit in toc -->

#### Before Submitting a Bug Report

A good bug report shouldn't leave others needing to chase you up for more information. Therefore, we ask you to investigate carefully, collect information and describe the issue in detail in your report. Please complete the following steps in advance to help us fix any potential bug as fast as possible.

- Make sure that you are using the latest version.
- Determine if your bug is really a bug and not an error on your side e.g. using incompatible environment components/versions (Make sure that you have read the [documentation](README.md). If you are looking for support, you might want to check [this section](#i-have-a-question)).
- To see if other users have experienced (and potentially already solved) the same issue you are having, check if there is not already a bug report existing for your bug or error in the [bug tracker](https://github.com/AliSajid/fahrenheight/issues?q=label%3Abug).
- Also make sure to search the internet (including Stack Overflow) to see if users outside of the GitHub community have discussed the issue.
- Collect information about the bug:
  - Stack trace (Traceback)
  - OS, Platform and Version (Windows, Linux, macOS, x86, ARM)
  - Version of the interpreter, compiler, SDK, runtime environment, package manager, depending on what seems relevant.
  - Browser and version if applicable
  - Possibly your input and the output
  - Can you reliably reproduce the issue? And can you also reproduce it with older versions?

<!-- omit in toc -->

#### How Do I Submit a Good Bug Report?

> You must never report security related issues, vulnerabilities or bugs including sensitive information to the issue tracker, or elsewhere in public. Instead, sensitive bugs must be sent by email to [security@imamiland.com](mailto:security@imamiland.com).

We use GitHub issues to track bugs and errors. If you run into an issue with the project:

- Open an [Issue](https://github.com/AliSajid/fahrenheight/issues/new). (Since we can't be sure at this point whether it is a bug or not, we ask you not to talk about a bug yet and not to label the issue.)
- Explain the behavior you would expect and the actual behavior.
- Please provide as much context as possible and describe the _reproduction steps_ that someone else can follow to recreate the issue on their own. This usually includes your code. For good bug reports you should isolate the problem and create a reduced test case.
- Provide the information you collected in the previous section.

Once it's filed:

- The project team will label the issue accordingly.
- A team member will try to reproduce the issue with your provided steps. If there are no reproduction steps or no obvious way to reproduce the issue, the team will ask you for those steps and mark the issue as `needs-repro`. Bugs with the `needs-repro` tag will not be addressed until they are reproduced.
- If the team is able to reproduce the issue, it will be marked `needs-fix`, as well as possibly other tags (such as `critical`), and the issue will be left to be [implemented by someone](#your-first-code-contribution).

### Suggesting Enhancements

This section guides you through submitting an enhancement suggestion for Fahrenheit Temperature Converter, **including completely new features and minor improvements to existing functionality**. Following these guidelines will help maintainers and the community to understand your suggestion and find related suggestions.

<!-- omit in toc -->

#### Before Submitting an Enhancement

- Make sure that you are using the latest version.
- Read the [documentation](README.md) carefully and find out if the functionality is already covered, maybe by an individual configuration.
- Perform a [search](https://github.com/AliSajid/fahrenheight/issues) to see if the enhancement has already been suggested. If it has, add a comment to the existing issue instead of opening a new one.
- Find out whether your idea fits with the scope and aims of the project. As this is a first-party website with a specific purpose (temperature conversion and analysis), new feature requests should align with this core functionality. The project owner maintains final decision on feature inclusion based on the project's intended use case. Consider whether your enhancement serves the primary temperature conversion purpose.

<!-- omit in toc -->

#### How Do I Submit a Good Enhancement Suggestion?

Enhancement suggestions are tracked as [GitHub issues](https://github.com/AliSajid/fahrenheight/issues).

- Use a **clear and descriptive title** for the issue to identify the suggestion.
- Provide a **step-by-step description of the suggested enhancement** in as many details as possible.
- **Describe the current behavior** and **explain which behavior you expected to see instead** and why. At this point you can also tell which alternatives do not work for you.
- You may want to **include screenshots or screen recordings** which help you demonstrate the steps or point out the part which the suggestion is related to.
- **Explain why this enhancement would be useful** to most Fahrenheit Temperature Converter users. You may also want to point out the other projects that solved it better and which could serve as inspiration.

### Your First Code Contribution

#### Development Setup

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:

   ```bash
   git clone https://github.com/YOUR_USERNAME/fahrenheight.git
   cd fahrenheight
   ```

3. **Add upstream remote**:

   ```bash
   git remote add upstream https://github.com/AliSajid/fahrenheight.git
   ```

4. **Install mise** (if not already installed):

   ```bash
   # macOS/Linux
   curl https://mise.run | sh

   # Or via Homebrew
   brew install mise
   ```

5. **Install dependencies**:

   ```bash
   mise install
   ```

6. **Create a feature branch**:

   ```bash
   git checkout -b feat/my-amazing-feature
   ```

#### Development Workflow

1. **Start the development server**:

   ```bash
   mise dev
   ```

2. **Make your changes** following the project conventions
3. **Run tests**:

   ```bash
   mise test
   ```

4. **Check code quality**:

   ```bash
   mise ci
   ```

5. **Commit your changes** using conventional commits:

   ```bash
   cog commit feat "add amazing feature"
   ```

6. **Push to your fork**:

   ```bash
   git push origin feat/my-amazing-feature
   ```

7. **Open a Pull Request** on GitHub

#### Technology Stack to Know

- **SvelteKit 2.x** with **Svelte 5** (runes: `$state`, `$derived`, `$effect`, `$props`)
- **TypeScript 5.x** for type safety
- **Skeleton UI 4.x** for UI components
- **Tailwind CSS 4.x** for styling
- **Vitest** for unit tests, **Playwright** for E2E tests
- **mise** for task running (replaces npm scripts)

### Improving The Documentation

Documentation improvements are always welcome! This includes:

- Fixing typos or clarifying existing documentation
- Adding examples or use cases
- Improving code comments and JSDoc annotations
- Updating the README or other markdown files
- Adding inline comments to complex code sections

To improve documentation:

1. Follow the same [development setup](#development-setup) process
2. Make your documentation changes
3. If updating markdown files, ensure they follow the existing style
4. For code documentation, use JSDoc format with TypeScript types
5. Submit a pull request with the `docs:` conventional commit prefix

## Style Guides

### Commit Messages

This project uses **Conventional Commits** for commit messages. This enables automated changelog generation and semantic versioning.

Format: `<type>(<scope>): <description>`

**Types:**

- `feat:` - A new feature
- `fix:` - A bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, missing semicolons, etc.)
- `refactor:` - Code refactoring without changing functionality
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks, dependency updates, etc.
- `ci:` - CI/CD configuration changes
- `perf:` - Performance improvements
- `build:` - Build system or external dependency changes

**Examples:**

```bash
feat(converter): add celsius to kelvin conversion
fix(ui): resolve dark mode contrast issue
docs(readme): update installation instructions
test(converter): add tests for negative temperatures
refactor(components): extract TemperatureInput component
```

**Breaking Changes:**

For breaking changes, add `!` after the type or include `BREAKING CHANGE:` in the commit footer:

```bash
feat!: change temperature precision to 3 decimal places

BREAKING CHANGE: The temperature precision has been changed from 2 to 3 decimal places.
This may affect applications that depend on the previous precision.
```

### Code Style

- **Formatting**: Prettier is configured - run `mise format` before committing
- **Linting**: ESLint is configured - run `mise lint` to check
- **Type Checking**: Run `mise check` to verify TypeScript types
- **Svelte 5**: Use runes (`$state`, `$derived`) instead of legacy reactivity
- **Components**: Keep components focused and single-purpose
- **Tests**: Write tests for new features and bug fixes

## Governance

This project uses a **benevolent dictator** model where the project owner makes all final decisions. As the project grows, more contributors may take on formal roles in governance. See [GOVERNANCE.md](GOVERNANCE.md) for details.

## Attribution

This guide is based on **contributing-gen**. [Make your own](https://github.com/bttger/contributing-gen)!
