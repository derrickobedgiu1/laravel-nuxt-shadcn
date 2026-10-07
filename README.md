# Laravel + Vue + Nuxt UI Starter Kit

A Laravel starter kit with a Vue frontend served through [Inertia](https://inertiajs.com), built with [Nuxt UI](https://ui.nuxt.com) and a neutral, shadcn-style theme (Geist font, black and white primary, `0.5rem` radius).

It is based on Laravel's official Vue starter kit. The backend, authentication flow and installer are the same. The component layer is Nuxt UI instead of shadcn-vue.

## Stack

- **Backend:** Laravel 13, PHP 8.3+, [Fortify](https://laravel.com/docs/fortify) for authentication, [Wayfinder](https://github.com/laravel/wayfinder) for typed routes
- **Frontend:** Vue 3 (Composition API), TypeScript, Inertia 3
- **UI:** [Nuxt UI](https://ui.nuxt.com) 4 on Tailwind CSS 4, with Lucide icons through Iconify
- **Tooling:** Vite+ (`vp`) for build, lint and format, Pest for tests, Pint and Larastan for PHP

## Features

- Login and logout, optional registration
- Email verification
- Password reset and password confirmation
- Two-factor authentication, with recovery codes
- Passkeys
- Settings: profile, security (password, 2FA, passkeys), appearance, delete account
- Dashboard layout with a collapsible, resizable sidebar, following the Nuxt UI dashboard template
- Light, dark and system colour modes

## Requirements

- PHP 8.3+ and Composer
- Node.js and npm, pnpm, yarn or bun

## Installation

Create a project with the Laravel installer:

```bash
laravel new my-app --using=derrickob/laravel-nuxt-shadcn
```

Pick the package manager with `--pnpm`, `--yarn` or `--bun`. The default is npm. The installer switches the `composer` scripts to your choice, and the GitHub workflow follows it.

The installer asks which authentication features to keep and then removes the code for everything you turn off.

Start the Laravel server and the Vite dev server together:

```bash
cd my-app
composer dev
```

## Theming

The theme is split across two files:

- `resources/css/app.css` holds the Nuxt UI design tokens (radius, primary colour, backgrounds, text) and the font families.
- `vite.config.ts` holds Nuxt UI's `ui` options, such as the neutral colour and the `subtle` default variant for inputs.

Fonts (Geist and Geist Mono) are loaded through `laravel-vite-plugin` in `vite.config.ts`. To change the look, edit those two files.

## Contributing

To work on the kit itself, read [CONTRIBUTING.md](CONTRIBUTING.md). Install it with the installer deferred, or it will modify your checkout.

## License

Open-sourced software licensed under the MIT license.
