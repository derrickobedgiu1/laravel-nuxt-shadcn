<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue';
</script>

<template>
    <div class="flex min-h-svh flex-col">
        <AppHeader />
        <main class="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-4">
            <slot />
        </main>
    </div>
</template>
