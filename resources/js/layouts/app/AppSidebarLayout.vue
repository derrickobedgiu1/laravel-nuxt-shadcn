<script setup lang="ts">
import AppSidebar from '@/components/AppSidebar.vue';

defineOptions({ inheritAttrs: false });
</script>

<template>
    <UDashboardGroup unit="rem" storage="local">
        <AppSidebar />

        <slot />
    </UDashboardGroup>
</template>
