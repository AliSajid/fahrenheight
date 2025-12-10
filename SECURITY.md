<!--
SPDX-FileCopyrightText: 2024 - 2025 Ali Sajid Imami

SPDX-License-Identifier: MIT
-->

# Security Policy

## Supported Versions

We support the current major release. Please ensure you are using the latest version to receive security updates.

| Version | Supported          |
| ------- | ------------------ |
| 1.x     | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

If you discover a security vulnerability, please report it to us as follows:

1. **Email:** Send an email to [security@imamiland.com](mailto:security@imamiland.com) with the details of the vulnerability.
2. **Details:** Include as much information as possible about the vulnerability and how it can be exploited.
3. **Response:** We will acknowledge your email within 48 hours and provide a detailed response within 5 business days.

We appreciate your efforts to responsibly disclose your findings.

## Security Best Practices

This is a first-party website project maintained by the repository owner. While the source code is open for transparency:

- The live application is deployed and maintained by the project owner
- Users interact with the hosted version at the production URL
- Report any suspicious behavior or potential vulnerabilities in the live application
- Do not include sensitive information in bug reports or public discussions

## Security Features

This project implements multiple layers of security:

- **Automated Security Scanning**: CodeQL, OSSF Scorecard, SonarCloud
- **Dependency Review**: Automated checks for vulnerable dependencies
- **Signed Releases**: All releases include GPG signatures
- **SLSA Attestations**: Build provenance for supply chain verification
- **Harden Runner**: Network egress restrictions in CI/CD
- **Action Pinning**: All GitHub Actions pinned to SHA hashes

## Security Disclosure Policy

We follow responsible disclosure practices:

- Vulnerabilities are addressed privately before public disclosure
- Security advisories are published through GitHub Security Advisories
- CVE identifiers are requested for significant vulnerabilities
- Credits are given to reporters in security advisories (unless anonymity is requested)
