# Release Setup Guide for ngx-seo-toolkit

This guide walks you through setting up automated publishing for the ngx-seo-toolkit package to NPM using GitHub Actions and Nx release.

## 🏗️ Repository Setup

### 1. Create GitHub Repository

1. Create a new repository on GitHub: `angular-seo-toolkit`
2. Push your local code to the repository:

```bash
git remote add origin https://github.com/your-username/angular-seo-toolkit.git
git branch -M main
git push -u origin main
```

### 2. Repository Settings

#### Branch Protection
1. Go to **Settings** > **Branches**
2. Add rule for `main` branch:
   - ✅ Require a pull request before merging
   - ✅ Require status checks to pass before merging
   - ✅ Require branches to be up to date before merging
   - ✅ Include administrators

#### Actions Permissions
1. Go to **Settings** > **Actions** > **General**
2. Set **Actions permissions** to: "Allow all actions and reusable workflows"
3. Set **Workflow permissions** to: "Read and write permissions"
4. ✅ Check "Allow GitHub Actions to create and approve pull requests"

## 🔐 Required Secrets

### 1. NPM Token

1. **Create NPM Account**: Sign up at [npmjs.com](https://www.npmjs.com)
2. **Generate Access Token**:
   ```bash
   npm login
   npm token create --type=automation
   ```
3. **Add to GitHub**:
   - Go to **Settings** > **Secrets and variables** > **Actions**
   - Click **New repository secret**
   - Name: `NPM_TOKEN`
   - Value: Your NPM token

### 2. GitHub Token

The `GITHUB_TOKEN` is automatically provided by GitHub Actions, no setup needed.

## 📦 Package Configuration

### Update package.json

Update the `author` and repository URLs in `packages/ngx-seo-toolkit/package.json`:

```json
{
  "name": "ngx-seo-toolkit",
  "author": {
    "name": "Your Name",
    "email": "your.email@example.com"
  },
  "homepage": "https://github.com/your-username/angular-seo-toolkit#readme",
  "repository": {
    "type": "git",
    "url": "https://github.com/your-username/angular-seo-toolkit.git",
    "directory": "packages/ngx-seo-toolkit"
  },
  "bugs": {
    "url": "https://github.com/your-username/angular-seo-toolkit/issues"
  }
}
```

## 🚀 Release Workflows

### 1. Automatic Release (Push to main)

The `release.yml` workflow triggers automatically when you push to `main`:

- ✅ Runs all tests and linting
- ✅ Builds the library
- ✅ Analyzes conventional commits
- ✅ Bumps version automatically
- ✅ Publishes to NPM
- ✅ Creates GitHub release
- ✅ Updates CHANGELOG.md

### 2. Manual Release

Use the `manual-release.yml` workflow for controlled releases:

1. Go to **Actions** > **Manual Release**
2. Click **Run workflow**
3. Select:
   - **Version**: patch, minor, major, or prerelease
   - **Dry run**: Check to preview without publishing
   - **Tag**: latest, beta, alpha, etc.

## 📋 Release Process

### Using Conventional Commits

The release process uses conventional commits to determine version bumps:

```bash
# Patch release (0.0.1 -> 0.0.2)
git commit -m "fix: resolve meta tag duplication issue"

# Minor release (0.0.1 -> 0.1.0)
git commit -m "feat: add breadcrumb schema support"

# Major release (0.0.1 -> 1.0.0)
git commit -m "feat!: remove deprecated SeoModule"
# or
git commit -m "feat: new API design

BREAKING CHANGE: SeoModule has been removed in favor of standalone providers"
```

### Manual Version Control

You can also manually control versions:

```bash
# Local version and publish
npx nx release version 1.2.3
npx nx release publish

# Or use GitHub Actions manual workflow
```

## 🧪 Testing Releases

### 1. Dry Run Release

Test your release setup without publishing:

```bash
# Local dry run
npx nx release version --dry-run

# Or use GitHub Actions with "Dry run" checkbox
```

### 2. Beta Releases

Test with beta versions:

```bash
npx nx release version --specifier=prerelease
npx nx release publish --tag=beta
```

### 3. Local Package Testing

Test the built package locally:

```bash
# Build the package
npx nx build ngx-seo-toolkit

# Pack for testing
cd dist/packages/ngx-seo-toolkit
npm pack

# Test in another project
npm install /path/to/ngx-seo-toolkit-0.0.1.tgz
```

## 📊 Monitoring Releases

### 1. NPM Package Status

Check your package on NPM:
- **Package page**: https://www.npmjs.com/package/ngx-seo-toolkit
- **Download stats**: https://npm-stat.com/charts.html?package=ngx-seo-toolkit

### 2. GitHub Releases

Monitor releases at: https://github.com/your-username/angular-seo-toolkit/releases

### 3. CI/CD Monitoring

- **Actions**: Monitor workflow runs in the Actions tab
- **Nx Cloud**: View build analytics at https://nx.app
- **Dependabot**: Automated dependency updates

## 🔧 Troubleshooting

### Common Issues

#### NPM Publishing Fails
```bash
# Check NPM token
npm whoami

# Verify package.json
npm publish --dry-run
```

#### Version Conflicts
```bash
# Reset to last published version
git reset --hard HEAD~1

# Or force version
npx nx release version --specifier=1.2.4
```

#### Build Failures
```bash
# Clean and rebuild
rm -rf dist node_modules
npm ci
npx nx build ngx-seo-toolkit
```

### Getting Help

1. **GitHub Issues**: Report problems in the repository issues
2. **Nx Documentation**: https://nx.dev/nx-api/nx/documents/release
3. **NPM Support**: https://docs.npmjs.com/

## 📝 Checklist

Before your first release:

- [ ] Repository created and configured
- [ ] NPM account created and verified
- [ ] NPM_TOKEN added to GitHub secrets
- [ ] package.json updated with correct metadata
- [ ] Branch protection rules configured
- [ ] Actions permissions configured
- [ ] All tests passing
- [ ] README.md updated
- [ ] Conventional commit format adopted

## 🎯 Best Practices

1. **Always run tests** before releasing
2. **Use semantic versioning** consistently
3. **Write meaningful commit messages** following conventional commits
4. **Test releases** with dry runs first
5. **Monitor package downloads** and feedback
6. **Keep dependencies updated**
7. **Document breaking changes** clearly
8. **Use beta releases** for experimental features

## 🔄 Automated Features

This setup provides:

- ✅ **Continuous Integration**: All PRs are tested
- ✅ **Automated Versioning**: Based on conventional commits
- ✅ **Automatic Publishing**: To NPM on main branch pushes
- ✅ **GitHub Releases**: With generated changelogs
- ✅ **Build Artifacts**: Stored and downloadable
- ✅ **PR Comments**: Build status updates
- ✅ **Security**: No secrets in code, proper permissions

Your ngx-seo-toolkit package is now ready for professional publishing! 🚀