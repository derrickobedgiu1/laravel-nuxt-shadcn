import { router } from '@inertiajs/vue3';
import { useToast } from '@nuxt/ui/composables';
import type { FlashToast } from '@/types/ui';

const icons: Record<FlashToast['type'], string> = {
    success: 'i-lucide-circle-check',
    info: 'i-lucide-info',
    warning: 'i-lucide-triangle-alert',
    error: 'i-lucide-circle-x',
};

const colors = {
    success: 'success',
    info: 'info',
    warning: 'warning',
    error: 'error',
} as const;

export function initializeFlashToast(): void {
    const toast = useToast();

    router.on('flash', (event) => {
        const flash = (event as CustomEvent).detail?.flash;
        const data = flash?.toast as FlashToast | undefined;

        if (!data) {
            return;
        }

        toast.add({
            title: data.message,
            icon: icons[data.type],
            color: colors[data.type],
        });
    });
}
