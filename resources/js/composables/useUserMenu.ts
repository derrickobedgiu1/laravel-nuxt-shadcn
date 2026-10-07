import { router, usePage } from '@inertiajs/vue3';
import type { DropdownMenuItem } from '@nuxt/ui';
import { computed } from 'vue';
import { getInitials } from '@/composables/useInitials';
import { logout } from '@/routes';
import { edit } from '@/routes/profile';
import { toUrl } from '@/lib/url';

export function useUserMenu() {
    const page = usePage();
    const user = computed(() => page.props.auth.user);

    const avatar = computed(() => ({
        src: user.value.avatar || undefined,
        alt: user.value.name,
        text: getInitials(user.value.name),
    }));

    const items = computed<DropdownMenuItem[][]>(() => [
        [
            {
                type: 'label',
                label: user.value.name,
                description: user.value.email,
                avatar: avatar.value,
            },
        ],
        [
            {
                label: 'Settings',
                icon: 'i-lucide-settings',
                to: toUrl(edit()),
            },
        ],
        [
            {
                label: 'Log out',
                icon: 'i-lucide-log-out',
                onSelect: () => {
                    router.flushAll();
                    router.visit(logout());
                },
            },
        ],
    ]);

    return { user, avatar, items };
}
