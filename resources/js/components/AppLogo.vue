<script setup lang="ts">
import { usePage } from '@inertiajs/vue3';
import AppLogoIcon from '@/components/AppLogoIcon.vue';

defineProps<{
    collapsed?: boolean;
}>();

const name = usePage().props.name;
</script>

<template>
    <div
        class="flex aspect-square size-8 shrink-0 items-center justify-center rounded-md bg-primary text-inverted"
    >
        <AppLogoIcon class="size-5 fill-current" />
    </div>
    <div v-if="!collapsed" class="ml-1 grid flex-1 text-left text-sm">
        <span
            class="mb-0.5 truncate leading-tight font-semibold text-highlighted"
            >{{ name }}</span
        >
    </div>
</template>
