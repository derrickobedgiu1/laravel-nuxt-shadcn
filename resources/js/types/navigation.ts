import type { InertiaLinkProps } from '@inertiajs/vue3';

export type NavItem = {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
    icon?: string;
    isActive?: boolean;
};
