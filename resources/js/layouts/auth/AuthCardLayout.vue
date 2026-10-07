<script setup lang="ts">
import { Link } from '@inertiajs/vue3';
import AppLogoIcon from '@/components/AppLogoIcon.vue';
import { home } from '@/routes';

defineProps<{
    title?: string;
    description?: string;
}>();
</script>

<template>
    <div
        class="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10"
    >
        <div class="flex w-full max-w-md flex-col gap-6">
            <Link
                :href="home()"
                class="flex items-center gap-2 self-center font-medium"
            >
                <AppLogoIcon class="size-9 fill-current text-highlighted" />
            </Link>

            <UCard
                variant="outline"
                :ui="{
                    root: 'rounded-xl',
                    body: 'px-10 py-8 sm:px-10 sm:py-8',
                }"
            >
                <div class="mb-6 space-y-1 text-center">
                    <h1 class="text-xl font-semibold text-highlighted">
                        {{ title }}
                    </h1>
                    <p class="text-sm text-muted">{{ description }}</p>
                </div>
                <slot />
            </UCard>
        </div>
    </div>
</template>
