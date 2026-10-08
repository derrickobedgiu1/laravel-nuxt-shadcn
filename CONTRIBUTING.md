# Contributing

This guide is for working on the kit itself. To use the kit, see the [README](README.md).

## Setting up a checkout

The kit ships an installer (see [The installer](#the-installer)). It runs on `composer install` when there is no lockfile, on `composer update` and on `composer require`, and it modifies your files. In a checkout of the kit, defer it before running any Composer command:

```bash
export LARAVEL_INSTALLER_DEFER_HOOKS=1 LARAVEL_INSTALLER_NO_NODE=1
composer setup
```

`composer setup` installs dependencies, creates `.env`, generates the app key, runs migrations and builds the assets. Then start working with `composer dev`, which runs the Laravel server and the Vite dev server together.

## Commands

| Command               | What it does                                     |
| --------------------- | ------------------------------------------------ |
| `composer dev`        | Starts the Laravel and Vite dev servers          |
| `composer test`       | Clears config, lints PHP, runs Larastan and Pest |
| `vendor/bin/pest`     | Runs the Pest tests only                         |
| `composer lint`       | Formats PHP with Pint                            |
| `composer ci:check`   | Runs what CI runs: `check`, `types:check`, tests |
| `npm run check`       | Lints and checks formatting (`vp check`)         |
| `npm run check:fix`   | Fixes formatting and lint issues                 |
| `npm run types:check` | Type-checks Vue and TypeScript (`vue-tsc`)       |
| `npm run build`       | Builds the assets (`vp build`)                   |

## Project structure

```
app/                         Laravel backend (Fortify actions, controllers)
resources/js/
  layouts/                   Root, app (sidebar or header), auth and settings layouts
  components/                App components (AppPanel, AppSidebar, UserMenu, ...)
  pages/                     Inertia pages (auth, settings, dashboard)
  composables/               Shared composables
tests/                       Pest tests
stubs/tests/phpunit/         PHPUnit versions of the tests
chisel.php                   Installer questions and cleanup rules
chisel-paths.php             Framework-specific file paths used by the installer
```

## The installer

`chisel.php` and `chisel-paths.php` drive the installer, using [Laravel Chisel](https://github.com/laravel/chisel) and Laravel Prompts. Optional code is wrapped in `@chisel-*` comments, for example `@chisel-passkeys ... @end-chisel-passkeys`, and the installer removes or keeps those sections depending on the answers. Keep the markers intact when you edit the files that contain them.

When it finishes, the installer deletes itself and resets the kit's package metadata in `composer.json` (name, author, homepage, description and keywords) so new apps start with Laravel's defaults. That reset matches exact text in `chiselResetComposerMetadata()`, so when you change those fields in `composer.json`, change the strings in `chisel.php` too.

Try the installer in a throwaway copy, never in your checkout. Pass answers to skip the prompts:

```bash
cp -r kit /tmp/kit-test && cd /tmp/kit-test
LARAVEL_INSTALLER_NO_NODE=1 php artisan install:features \
  --answers='{"auth_features":["registration","email-verification"]}'
```

## Dependencies

- Lockfiles (`composer.lock`, `pnpm-lock.yaml`, `package-lock.json`) are not committed, so every new project resolves the latest versions.
- Do not pin a package manager: no `packageManager` field in `package.json`. The Laravel installer offers `--npm`, `--pnpm`, `--yarn` and `--bun`, and the kit must install under all four. The installer rewrites the `npm` commands in the `dev`, `setup` and `ci:check` composer scripts, so keep them in their plain `npm ...` form.
- `.github/workflows/tests.yml` ships to generated apps. Its "Setup package manager" step reads the manager from those rewritten composer scripts and installs it when the runner lacks it.
- The Vite+ alias for `vite` needs both an `overrides` entry in `package.json` (npm) and the `catalog` and `overrides` in `pnpm-workspace.yaml` (pnpm). Keep both.

## Known workarounds

- `tsconfig.json` excludes `resources/js/actions/Illuminate` from type-checking. Wayfinder generates a `"query"` HTTP verb for Laravel's own redirect route that its `Method` type does not accept yet. Remove the exclude once [laravel/wayfinder#324](https://github.com/laravel/wayfinder/pull/324) is released.

## Commits

Use conventional commit titles: `feat:`, `fix:`, `build:`, `chore:`, `refactor:`, `test:`, `ci:` and `docs:`.
