<script setup lang="ts">
import { Head } from '@inertiajs/vue3';
import AppPanel from '@/components/AppPanel.vue';
import PlaceholderPattern from '@/components/PlaceholderPattern.vue';
</script>

<template>
    <Head title="Dashboard" />

    <AppPanel id="dashboard" title="Dashboard">
        <div class="flex h-full flex-1 flex-col gap-4">
            <div
                class="grid auto-rows-min grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3"
            >
                <div
                    v-for="index in 3"
                    :key="index"
                    class="relative aspect-video overflow-hidden rounded-xl border border-default last:sm:col-span-2 last:xl:col-span-1"
                >
                    <PlaceholderPattern />
                </div>
            </div>
            <div
                class="relative min-h-[100vh] flex-1 rounded-xl border border-default md:min-h-min"
            >
                <PlaceholderPattern />
            </div>
        </div>
    </AppPanel>
</template>
