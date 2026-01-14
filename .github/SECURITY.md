# Security Policy

## Reporting a vulnerability

If you believe you’ve found a security vulnerability, **do not open a public GitHub issue**.

Instead:

- Contact the maintainers directly via your established internal channel, or
- Email the project security contact (if configured for this repo/org)

Please include:

- A clear description of the issue
- Steps to reproduce (proof-of-concept if available)
- Impact assessment (what an attacker can do)
- Affected paths/files/endpoints (if known)

## Scope

This repository contains the static site generator for Augusta University's ML Paper Reading Group and its related CI/GitHub automation.

Examples of in-scope issues:

- Auth/session vulnerabilities (cookies, tokens, CSRF)
- Sensitive data exposure in client bundles or logs
- Dependency vulnerabilities with practical exploitability
- Misconfigured CORS/cookie settings that enable account compromise

Out of scope:

- Issues requiring physical access to a device
- Social engineering

## Supported versions

We generally support the latest `main` branch and actively maintained release branches (if any).

## Handling

We aim to:

- Acknowledge reports promptly
- Validate and triage impact
- Patch in a timely manner
- Coordinate disclosure as appropriate
