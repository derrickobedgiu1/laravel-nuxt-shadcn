import { dashboard } from '@/routes';
import type { NavItem } from '@/types';

export const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: 'i-lucide-layout-grid',
    },
];

export const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/derrickobedgiu1/laravel-nuxt-shadcn',
        icon: 'i-lucide-folder-git-2',
    },
    {
        title: 'Documentation',
        href: 'https://github.com/derrickobedgiu1/laravel-nuxt-shadcn#readme',
        icon: 'i-lucide-book-open',
    },
];
