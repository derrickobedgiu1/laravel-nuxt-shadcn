<script setup lang="ts">
import { Link } from '@inertiajs/vue3';
import type { NavigationMenuItem } from '@nuxt/ui';
import { computed, ref } from 'vue';
import AppLogo from '@/components/AppLogo.vue';
import UserMenu from '@/components/UserMenu.vue';
import { useNavigationItems } from '@/composables/useNavigationItems';
import { footerNavItems, mainNavItems } from '@/lib/navigation';
import { dashboard } from '@/routes';

const open = ref(false);

const { toMenuItems } = useNavigationItems();

const close = () => {
    open.value = false;
};

const mainItems = computed<NavigationMenuItem[]>(() =>
    toMenuItems(mainNavItems, { onSelect: close }),
);

const footerItems = computed<NavigationMenuItem[]>(() =>
    toMenuItems(footerNavItems, { external: true }),
);
</script>

<template>
    <UDashboardSidebar
        id="default"
        v-model:open="open"
        collapsible
        resizable
        class="bg-elevated/25"
        :ui="{ footer: 'lg:border-t lg:border-default' }"
    >
        <template #header="{ collapsed }">
            <Link
                :href="dashboard()"
                class="flex min-w-0 items-center rounded-md p-1 hover:bg-elevated"
                :class="{ 'mx-auto': collapsed }"
                @click="close"
            >
                <AppLogo :collapsed="collapsed" />
            </Link>
        </template>

        <template #default="{ collapsed }">
            <UNavigationMenu
                :collapsed="collapsed"
                :items="mainItems"
                orientation="vertical"
                tooltip
                popover
            />

            <UNavigationMenu
                :collapsed="collapsed"
                :items="footerItems"
                orientation="vertical"
                tooltip
                class="mt-auto"
            />
        </template>

        <template #footer="{ collapsed }">
            <UserMenu :collapsed="collapsed" />
        </template>
    </UDashboardSidebar>
</template>
