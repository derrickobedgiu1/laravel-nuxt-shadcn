<script setup lang="ts">
import AppLayout from '@/layouts/app/AppSidebarLayout.vue';

defineOptions({ inheritAttrs: false });
</script>

<template>
    <AppLayout>
        <slot />
    </AppLayout>
</template>
