import inertia from '@inertiajs/vite';
import { wayfinder } from '@laravel/vite-plugin-wayfinder';
import ui from '@nuxt/ui/vite';
import vue from '@vitejs/plugin-vue';
import laravel from 'laravel-vite-plugin';
import { bunny } from 'laravel-vite-plugin/fonts';
import { defineConfig, lazyPlugins } from 'vite-plus';

export default defineConfig({
    plugins: lazyPlugins(() => [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.ts'],
            refresh: true,
            fonts: [
                bunny('Geist', {
                    weights: [300, 400, 500, 600, 700],
                }),
                bunny('Geist Mono', {
                    weights: [400, 500, 600],
                }),
            ],
        }),
        inertia(),
        vue({
            template: {
                transformAssetUrls: {
                    base: null,
                    includeAbsolute: false,
                },
            },
        }),
        ui({
            router: 'inertia',
            icon: {
                clientBundle: { scan: true },
            },
            ui: {
                colors: {
                    neutral: 'neutral',
                },
                input: { defaultVariants: { variant: 'subtle' } },
                select: { defaultVariants: { variant: 'subtle' } },
                textarea: { defaultVariants: { variant: 'subtle' } },
                selectMenu: { defaultVariants: { variant: 'subtle' } },
                inputMenu: { defaultVariants: { variant: 'subtle' } },
                inputNumber: { defaultVariants: { variant: 'subtle' } },
                inputTags: { defaultVariants: { variant: 'subtle' } },
                inputDate: { defaultVariants: { variant: 'subtle' } },
                inputTime: { defaultVariants: { variant: 'subtle' } },
                pinInput: { defaultVariants: { variant: 'subtle' } },
            },
        }),
        wayfinder({
            formVariants: true,
        }),
    ]),
    ssr: {
        noExternal: ['@nuxt/ui'],
    },
    server: {
        watch: {
            ignored: [
                '**/.agents/**',
                '**/.claude/**',
                '**/.cursor/**',
                '**/.junie/**',
                '**/vendor/**',
            ],
        },
    },
    lint: {
        ignorePatterns: [
            'vendor/**',
            'node_modules/**',
            'public/**',
            'bootstrap/ssr/**',
            'tailwind.config.js',
            'resources/js/actions/**',
            'resources/js/routes/**',
            'resources/js/wayfinder/**',
        ],
        options: {
            denyWarnings: true,
            typeAware: true,
        },
    },
    fmt: {
        printWidth: 80,
        tabWidth: 4,
        singleQuote: true,
        semi: true,
        singleAttributePerLine: false,
        htmlWhitespaceSensitivity: 'css',
        ignorePatterns: [
            '.github/**',
            'composer.json',
            'resources/views/mail/*',
        ],
        sortTailwindcss: {
            stylesheet: 'resources/css/app.css',
        },
    },
});
