# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Structure

This is an Nx monorepo for Angular SEO toolkit development. The main application is located in `apps/demo/` with the following key structure:

- `apps/demo/` - Main Angular application with SSR support
- `apps/demo-e2e/` - End-to-end tests using Playwright
- Root-level configuration files for Nx, ESLint, TypeScript

The demo app uses Angular 20.2 with Server-Side Rendering (SSR) enabled via Angular Universal and Express server.

## Common Commands

### Development
```bash
# Start development server
npx nx serve demo

# Build production bundle
npx nx build demo

# Serve static production build
npx nx serve-static demo
```

### Testing and Linting
```bash
# Run linting
npx nx lint demo

# Run e2e tests
npx nx e2e demo-e2e

# Run all tasks (lint, test, build, e2e)
npx nx run-many -t lint test build e2e
```

### Project Management
```bash
# Show available targets for demo project
npx nx show project demo

# Generate new Angular application
npx nx g @nx/angular:app <app-name>

# Generate new Angular library
npx nx g @nx/angular:lib <lib-name>

# View project dependency graph
npx nx graph
```

## Architecture

- **Framework**: Angular 20.2 with standalone components
- **Build System**: Nx 21.5.2 monorepo with Angular CLI builders
- **SSR**: Angular Universal with Express server (`apps/demo/src/server.ts`)
- **Testing**: Playwright for e2e tests (no unit tests configured)
- **Linting**: ESLint with Angular ESLint rules
- **Styling**: CSS (no preprocessing configured)

The application uses Angular's new standalone component architecture without NgModules. The demo app includes basic routing with home, about, and blog-post pages.

## Configuration Files

- `nx.json` - Nx workspace configuration with target defaults and plugins
- `apps/demo/project.json` - Demo application configuration with build/serve/lint targets
- `apps/demo-e2e/project.json` - E2e test configuration
- `eslint.config.mjs` - ESLint configuration at workspace root
- `tsconfig.base.json` - Base TypeScript configuration

## Development Notes

- The workspace uses Nx Cloud for CI/CD and caching (ID: 68c70c7d5b1cd94f100ff4a0)
- No unit testing framework is configured (unitTestRunner: "none")
- Playwright is set up for e2e testing with configuration in `apps/demo-e2e/playwright.config.ts`
- The demo app is configured with SSR and includes both client and server entry points
- Uses Express server for serving the SSR application

## CI/CD

The project includes a GitHub Actions workflow (`.github/workflows/ci.yml`) that:
- Installs dependencies with `npm ci --legacy-peer-deps`
- Installs Playwright with dependencies
- Runs `npx nx run-many -t lint test build e2e`
- Uses `npx nx fix-ci` for failure analysis