<script setup lang="ts">
import type { DashboardPanelProps } from '@nuxt/ui';

defineProps<{
    id: string;
    title?: string;
    ui?: DashboardPanelProps['ui'];
}>();
</script>

<template>
    <UDashboardPanel :id="id" :ui="ui">
        <template #header>
            <UDashboardNavbar :title="title">
                <template #leading>
                    <UDashboardSidebarCollapse />
                </template>
            </UDashboardNavbar>

            <slot name="toolbar" />
        </template>

        <template #body>
            <slot />
        </template>
    </UDashboardPanel>
</template>
