import type { NavigationMenuItem } from '@nuxt/ui';
import { useCurrentUrl } from '@/composables/useCurrentUrl';
import { toUrl } from '@/lib/url';
import type { NavItem } from '@/types';

type Options = {
    external?: boolean;
    onSelect?: () => void;
};

export function useNavigationItems() {
    const { isCurrentUrl } = useCurrentUrl();

    function toMenuItems(
        items: NavItem[],
        options: Options = {},
    ): NavigationMenuItem[] {
        return items.map((item) => ({
            label: item.title,
            icon: item.icon,
            to: toUrl(item.href),
            active: options.external ? false : isCurrentUrl(item.href),
            onSelect: options.onSelect,
            ...(options.external && {
                target: '_blank',
                rel: 'noopener noreferrer',
            }),
        }));
    }

    return { toMenuItems };
}
