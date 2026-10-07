<script setup lang="ts">
import { ref } from 'vue';
import type { Passkey } from '@/types/auth';

const props = defineProps<{
    passkey: Passkey;
}>();

const emit = defineEmits<{
    remove: [id: number, onError: () => void];
}>();

const isDeleting = ref(false);

const handleDelete = () => {
    isDeleting.value = true;
    emit('remove', props.passkey.id, () => {
        isDeleting.value = false;
    });
};
</script>

<template>
    <div
        class="flex items-center justify-between border-b border-default p-4 last:border-b-0"
    >
        <div class="flex items-center gap-4">
            <div
                class="flex size-10 shrink-0 items-center justify-center rounded-xl bg-elevated"
            >
                <UIcon name="i-lucide-key-round" class="size-5 text-muted" />
            </div>
            <div class="space-y-1">
                <div class="flex items-center gap-2.5">
                    <p class="font-medium tracking-tight text-highlighted">
                        {{ passkey.name }}
                    </p>
                    <UBadge
                        v-if="passkey.authenticator"
                        :label="passkey.authenticator"
                        color="neutral"
                        variant="subtle"
                        size="sm"
                        class="uppercase"
                    />
                </div>
                <p class="text-sm text-muted">
                    Added {{ passkey.created_at_diff }}
                    <template v-if="passkey.last_used_at_diff">
                        <span class="mx-1 text-dimmed">/</span>
                        Last used {{ passkey.last_used_at_diff }}
                    </template>
                </p>
            </div>
        </div>

        <UModal
            title="Remove passkey"
            :description="`Are you sure you want to remove the &quot;${passkey.name}&quot; passkey? You will no longer be able to use it to sign in.`"
        >
            <UButton
                icon="i-lucide-trash-2"
                color="error"
                variant="ghost"
                size="sm"
                aria-label="Remove"
            />

            <template #footer="{ close }">
                <div class="flex w-full justify-end gap-2">
                    <UButton
                        label="Cancel"
                        color="neutral"
                        variant="subtle"
                        @click="close()"
                    />
                    <UButton
                        :label="isDeleting ? 'Removing...' : 'Remove passkey'"
                        color="error"
                        :loading="isDeleting"
                        @click="handleDelete"
                    />
                </div>
            </template>
        </UModal>
    </div>
</template>
