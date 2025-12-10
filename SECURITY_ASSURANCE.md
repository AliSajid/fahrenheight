<!--
SPDX-FileCopyrightText: 2024 - 2025 Ali Sajid Imami

SPDX-License-Identifier: MIT
-->

# Security Assurance Case for Fahrenheit Temperature Converter

## 1. Introduction

This document provides a comprehensive security assurance case for the Fahrenheit Temperature Converter, a **first-party website** developed and maintained by Ali Sajid Imami. The application is a personal temperature conversion tool built as a static web application with SvelteKit that operates entirely in the browser without server-side processing.

As a first-party project, deployment and maintenance are controlled exclusively by the project owner. The source code is open source for transparency and educational purposes. This assurance case ensures the application meets security best practices appropriate for a first-party website.

## 2. Security Objectives

The following security objectives guide the development and deployment of the application:

- **Input Validation**: Prevent injection attacks and incorrect input handling
- **Code Integrity and Authenticity**: Ensure the code executes as intended without unauthorized modifications
- **Dependency Management**: Mitigate risks from third-party dependencies
- **XSS Prevention**: Protect against cross-site scripting attacks
- **Build Security**: Ensure secure and reproducible builds
- **Deployment Security**: Secure hosting and content delivery
- **CI/CD Security**: Comprehensive automated security scanning
- **Data Privacy**: Respect user privacy and comply with data protection principles

## 3. Security Threat Analysis

### 3.1. Input Validation

**Threat**: Malicious input leading to application errors, XSS, or unintended behavior.

**Mitigation**:

- Numeric input validation with type checking
- Decimal precision validation (max 2 decimal places) using regex
- Range validation for reasonable temperature values
- Empty input handling without displaying errors
- TypeScript type system for compile-time validation

**Evidence**:

- Validation implemented in `src/lib/utils/Temperature.class.ts`
- Unit tests covering edge cases and boundary values
- Input type: `type="text"` with `inputmode="decimal"` for better control

**Assurance**: Input validation is comprehensive with multiple layers of defense.

### 3.2. Code Integrity and Authenticity

**Threat**: Unauthorized code modifications or malicious code injection during build or deployment.

**Mitigation**:

- GPG-signed releases with detached signatures
- SLSA build provenance attestations
- SHA256 checksums for all release artifacts
- GitHub Actions workflow pinning to specific SHA hashes
- Hardened runners with network egress restrictions

**Evidence**:

- Release workflow in `.github/workflows/release.yaml`
- Composite action in `.github/actions/release-core/action.yaml`
- All releases include `.asc` signature files and `SHA256SUMS.txt`

**Assurance**: Code integrity is verifiable at every stage from source to deployment.

### 3.3. Dependency Management

**Threat**: Vulnerable or malicious third-party dependencies.

**Mitigation**:

- Minimal dependency footprint (only essential packages)
- All dependencies from trusted sources (npm official registry)
- Automated dependency updates via Renovate bot
- GitHub Dependency Review blocking vulnerable dependencies
- OSSF Scorecard monitoring supply chain security
- pnpm with lock file for reproducible builds

**Evidence**:

- Dependency review workflow in `.github/workflows/dependency-review.yaml`
- Renovate configuration in `renovate.json`
- OSSF Scorecard workflow in `.github/workflows/scorecard.yaml`

**Assurance**: Dependency risks are minimized through automation and monitoring.

### 3.4. XSS Prevention

**Threat**: Cross-site scripting attacks through user input or component rendering.

**Mitigation**:

- Svelte's automatic HTML escaping for all interpolated values
- No use of `@html` directive with user-controlled data
- No `eval()` or `Function()` constructor usage
- Component isolation preventing script injection
- TypeScript types preventing unintended data flows
- Content Security Policy headers via Cloudflare Pages

**Evidence**:

- Code review showing no unsafe HTML rendering
- No external script sources or inline scripts
- Test coverage for input handling

**Assurance**: XSS protection is comprehensive with multiple defense layers.

### 3.5. Build Security

**Threat**: Compromised build process or artifacts.

**Mitigation**:

- Static site generation (no server-side processing)
- Deterministic builds with reproducible outputs
- GitHub Actions with hardened runners
- Network egress restrictions during build
- Action pinning to SHA hashes
- Minimal secrets exposure
- Build artifact attestations

**Evidence**:

- Build workflow in `.github/workflows/build-and-package.yaml`
- Harden Runner configuration in all workflows
- SLSA provenance generation

**Assurance**: Build process follows secure software development practices.

### 3.6. Deployment Security

**Threat**: Insecure deployment configuration or content delivery.

**Mitigation**:

- First-party website: deployment controlled exclusively by project owner
- Cloudflare Pages with global CDN
- HTTPS-only with modern TLS cipher suites
- Security headers (CSP, X-Frame-Options, X-Content-Type-Options)
- Branch-based deployment isolation
- No exposed secrets in deployment configuration
- Deployment credentials restricted to owner account

**Evidence**:

- Deployment configuration in `wrangler.toml`
- Deploy workflow in `.github/workflows/deploy.yaml`
- Cloudflare Pages security features
- Owner-controlled deployment process

**Assurance**: Deployment follows hosting security best practices for first-party websites.

### 3.7. CI/CD Security

**Threat**: Compromised CI/CD pipeline or insufficient security scanning.

**Mitigation**:

- CodeQL static analysis for vulnerability detection
- SonarCloud code quality and security analysis
- OSSF Scorecard supply chain assessment
- Dependency review for vulnerable packages
- Harden Runner on all workflows
- Secret scanning enabled
- Minimal permissions (principle of least privilege)

**Evidence**:

- Security workflows in `.github/workflows/`
- Workflow permissions explicitly defined
- Action pinning to SHA hashes

**Assurance**: CI/CD security is comprehensive with multiple scanning layers.

### 3.8. Data Privacy

**Threat**: Unintentional collection or exposure of user data.

**Mitigation**:

- No user authentication or accounts
- No cookies or tracking scripts
- No personal data collection
- No backend API or database
- All processing happens client-side
- No third-party data sharing

**Evidence**:

- Static site with no server-side processing
- No analytics or tracking code
- No external API calls

**Assurance**: Application respects user privacy by design.

## 4. Security Recommendations

### For Users

- **Use Hosted Version**: Access the live application at the official production URL
- **Browser Security**: Keep browsers up-to-date with latest security patches
- **HTTPS Only**: The application is served exclusively via HTTPS
- **Report Issues**: Report suspicious behavior to [security@imamiland.com](mailto:security@imamiland.com)

### For Contributors

- **Follow Contributing Guidelines**: Adhere to [CONTRIBUTING.md](CONTRIBUTING.md)
- **Security Testing**: Run `mise ci` before submitting pull requests
- **Conventional Commits**: Use conventional commit format for semantic versioning
- **Report Vulnerabilities**: Report security issues privately to [security@imamiland.com](mailto:security@imamiland.com)
- **Understand Scope**: This is a first-party project with focused scope

### For Maintainers

- **Regular Updates**: Keep dependencies updated with Renovate
- **Security Reviews**: Conduct periodic security reviews (every 6 months)
- **Incident Response**: Maintain security incident response plan
- **Disclosure Policy**: Follow responsible disclosure practices

## 5. Compliance and Standards

The application follows industry standards and best practices:

- **REUSE 3.0**: Software licensing compliance
- **SLSA Framework**: Supply chain security levels
- **OpenSSF Best Practices**: CII Best Practices Badge criteria
- **Conventional Commits**: Semantic versioning and changelog automation
- **WCAG 2.1**: Web accessibility guidelines (Level AA)

## 6. Security Testing

The application undergoes multiple layers of security testing:

### Static Analysis

- **CodeQL**: JavaScript/TypeScript vulnerability detection
- **SonarCloud**: Code quality and security smells
- **ESLint**: Linting with security-focused rules

### Dynamic Analysis

- **Playwright E2E Tests**: User interaction security testing
- **Vitest Unit Tests**: Component and utility security testing

### Manual Review

- **Code Review**: All changes reviewed before merging
- **Security Review**: Periodic security-focused code reviews
- **Penetration Testing**: Recommended annually (when resources available)

## 7. Incident Response

In case of a security incident:

1. **Report**: Email [security@imamiland.com](mailto:security@imamiland.com)
2. **Acknowledgment**: Response within 48 hours
3. **Investigation**: Security team investigates and validates
4. **Patch**: Fix developed and tested
5. **Disclosure**: Coordinated disclosure with security advisory
6. **Release**: Patched version released with changelog
7. **Notification**: Users notified via GitHub Security Advisory

## 8. Conclusion

This security assurance case demonstrates that the Fahrenheit Temperature Converter implements comprehensive security controls appropriate for a client-side static web application. The application:

- Validates all user inputs
- Protects against common web vulnerabilities
- Maintains code integrity through signing and attestation
- Follows secure development and deployment practices
- Includes comprehensive automated security testing
- Respects user privacy by design

By following these security practices, users and developers can confidently use and contribute to the project while maintaining a strong security posture.

---

**Assurance Level**: High for a client-side static application

**Review Date**: December 2025

**Next Review**: December 2026 (or after significant architecture changes)

**Contact**: [security@imamiland.com](mailto:security@imamiland.com)
