<script setup lang="ts">
import { computed } from 'vue';
import { useUserMenu } from '@/composables/useUserMenu';

const props = defineProps<{
    collapsed?: boolean;
    compact?: boolean;
}>();

const { user, avatar, items } = useUserMenu();

const iconOnly = computed(() => props.collapsed || props.compact);
</script>

<template>
    <UDropdownMenu
        :items="items"
        :content="{ align: 'center', collisionPadding: 12 }"
        :ui="{
            content: iconOnly
                ? 'w-56'
                : 'w-(--reka-dropdown-menu-trigger-width)',
        }"
    >
        <UButton
            v-bind="{
                avatar,
                label: iconOnly ? undefined : user.name,
                trailingIcon: iconOnly
                    ? undefined
                    : 'i-lucide-chevrons-up-down',
            }"
            color="neutral"
            variant="ghost"
            :block="!compact"
            :square="iconOnly"
            class="data-[state=open]:bg-elevated"
            :ui="{ trailingIcon: 'text-dimmed' }"
            :aria-label="iconOnly ? 'User menu' : undefined"
            :data-test="iconOnly ? 'user-menu-button' : 'sidebar-menu-button'"
        />
    </UDropdownMenu>
</template>
