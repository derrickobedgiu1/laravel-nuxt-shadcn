<script setup lang="ts">
import { Head } from '@inertiajs/vue3';
import AppearanceTabs from '@/components/AppearanceTabs.vue';
</script>

<template>
    <Head title="Appearance settings" />

    <h1 class="sr-only">Appearance settings</h1>

    <UPageCard
        title="Appearance settings"
        description="Update the appearance settings for your account"
        variant="subtle"
    >
        <AppearanceTabs />
    </UPageCard>
</template>
