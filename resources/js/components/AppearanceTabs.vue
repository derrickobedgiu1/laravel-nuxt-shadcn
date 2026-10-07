<script setup lang="ts">
import type { TabsItem } from '@nuxt/ui';
import { useColorMode } from '@vueuse/core';
import { computed } from 'vue';

const colorMode = useColorMode();

const items: TabsItem[] = [
    { value: 'light', icon: 'i-lucide-sun', label: 'Light' },
    { value: 'dark', icon: 'i-lucide-moon', label: 'Dark' },
    { value: 'auto', icon: 'i-lucide-monitor', label: 'System' },
];

const selected = computed({
    get: () => colorMode.store.value,
    set: (value: string) => {
        colorMode.value = value as 'light' | 'dark' | 'auto';
    },
});
</script>

<template>
    <UTabs
        v-model="selected"
        :items="items"
        :content="false"
        color="neutral"
        variant="pill"
        class="w-auto"
    />
</template>
