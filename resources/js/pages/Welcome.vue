<script setup lang="ts">
import { Head, usePage } from '@inertiajs/vue3';
import AppLogoIcon from '@/components/AppLogoIcon.vue';
import { dashboard, login } from '@/routes';
/* @chisel-registration */
import { register } from '@/routes';
/* @end-chisel-registration */

const page = usePage();
</script>

<template>
    <Head title="Welcome" />

    <div class="flex min-h-svh flex-col bg-default">
        <header
            class="mx-auto flex w-full max-w-5xl items-center justify-between p-6"
        >
            <div class="flex items-center gap-2 font-semibold text-highlighted">
                <AppLogoIcon class="size-6 fill-current" />
                {{ page.props.name }}
            </div>

            <nav class="flex items-center gap-2">
                <UColorModeButton />
                <UButton
                    v-if="page.props.auth.user"
                    :to="dashboard().url"
                    label="Dashboard"
                    color="neutral"
                    variant="outline"
                />
                <template v-else>
                    <UButton
                        :to="login().url"
                        label="Log in"
                        color="neutral"
                        variant="ghost"
                    />
                    <!-- @chisel-registration -->
                    <UButton
                        :to="register().url"
                        label="Register"
                        color="neutral"
                        variant="outline"
                    />
                    <!-- @end-chisel-registration -->
                </template>
            </nav>
        </header>

        <main
            class="mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center gap-6 px-6 pb-24 text-center"
        >
            <h1
                class="text-4xl font-semibold tracking-tight text-highlighted sm:text-5xl"
            >
                Let's get started
            </h1>
            <p class="max-w-xl text-lg text-muted">
                Laravel, Inertia, Vue and Nuxt UI, wired together and ready to
                build on.
            </p>
            <div class="flex flex-wrap justify-center gap-3">
                <UButton
                    to="https://laravel.com/docs"
                    target="_blank"
                    label="Laravel docs"
                    trailing-icon="i-lucide-arrow-up-right"
                />
                <UButton
                    to="https://ui.nuxt.com/docs/getting-started/installation/vue"
                    target="_blank"
                    label="Nuxt UI docs"
                    color="neutral"
                    variant="outline"
                    trailing-icon="i-lucide-arrow-up-right"
                />
            </div>
        </main>
    </div>
</template>
