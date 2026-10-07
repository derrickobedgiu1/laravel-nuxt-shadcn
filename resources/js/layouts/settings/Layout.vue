<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui';
import { computed } from 'vue';
import AppPanel from '@/components/AppPanel.vue';
import { useCurrentUrl } from '@/composables/useCurrentUrl';
import { toUrl } from '@/lib/url';
import { edit as editAppearance } from '@/routes/appearance';
import { edit as editProfile } from '@/routes/profile';
import { edit as editSecurity } from '@/routes/security';
import type { NavItem } from '@/types';

const settingsNavItems: NavItem[] = [
    {
        title: 'Profile',
        href: editProfile(),
        icon: 'i-lucide-user',
    },
    {
        title: 'Security',
        href: editSecurity(),
        icon: 'i-lucide-shield',
    },
    {
        title: 'Appearance',
        href: editAppearance(),
        icon: 'i-lucide-palette',
    },
];

const { isCurrentOrParentUrl } = useCurrentUrl();

const items = computed<NavigationMenuItem[]>(() =>
    settingsNavItems.map((item) => ({
        label: item.title,
        icon: item.icon,
        to: toUrl(item.href),
        active: isCurrentOrParentUrl(item.href),
    })),
);
</script>

<template>
    <AppPanel id="settings" title="Settings" :ui="{ body: 'lg:py-12' }">
        <template #toolbar>
            <UDashboardToolbar>
                <UNavigationMenu
                    :items="items"
                    highlight
                    aria-label="Settings"
                    class="-mx-1 flex-1"
                />
            </UDashboardToolbar>
        </template>

        <div
            class="mx-auto flex w-full flex-col gap-4 sm:gap-6 lg:max-w-2xl lg:gap-12"
        >
            <slot />
        </div>
    </AppPanel>
</template>
