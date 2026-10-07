<script setup lang="ts">
import { Link } from '@inertiajs/vue3';
import type { NavigationMenuItem } from '@nuxt/ui';
import { computed } from 'vue';
import AppLogo from '@/components/AppLogo.vue';
import UserMenu from '@/components/UserMenu.vue';
import { useNavigationItems } from '@/composables/useNavigationItems';
import { toUrl } from '@/lib/url';
import { footerNavItems, mainNavItems } from '@/lib/navigation';
import { dashboard } from '@/routes';

const { toMenuItems } = useNavigationItems();

const mainItems = computed<NavigationMenuItem[]>(() =>
    toMenuItems(mainNavItems),
);
const externalItems = computed<NavigationMenuItem[]>(() =>
    toMenuItems(footerNavItems, { external: true }),
);
</script>

<template>
    <div>
        <UHeader toggle-side="left" :ui="{ container: 'max-w-7xl' }">
            <template #left>
                <Link :href="dashboard()" class="flex items-center gap-x-2">
                    <AppLogo />
                </Link>
            </template>

            <UNavigationMenu :items="mainItems" />

            <template #right>
                <UTooltip
                    v-for="item in footerNavItems"
                    :key="item.title"
                    :text="item.title"
                    class="hidden lg:block"
                >
                    <UButton
                        :icon="item.icon"
                        :to="toUrl(item.href)"
                        target="_blank"
                        rel="noopener noreferrer"
                        color="neutral"
                        variant="ghost"
                        :aria-label="item.title"
                    />
                </UTooltip>

                <UserMenu compact />
            </template>

            <template #body>
                <UNavigationMenu
                    :items="[mainItems, externalItems]"
                    orientation="vertical"
                    class="-mx-2.5"
                />
            </template>
        </UHeader>
    </div>
</template>
