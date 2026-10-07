<script setup lang="ts">
import { router } from '@inertiajs/vue3';
import type { Passkey } from '@/types/auth';
import PasskeyItem from '@/components/PasskeyItem.vue';
import PasskeyRegister from '@/components/PasskeyRegister.vue';
import { destroy } from '@/actions/Laravel/Passkeys/Http/Controllers/PasskeyRegistrationController';

export type Props = {
    canManagePasskeys?: boolean;
    passkeys?: Passkey[];
};

withDefaults(defineProps<Props>(), {
    canManagePasskeys: false,
    passkeys: () => [],
});

const handleDelete = (id: number, onError: () => void) => {
    router.delete(destroy.url(id), {
        preserveScroll: true,
        onError,
    });
};

const handleRegisterSuccess = () => {
    router.reload();
};
</script>

<template>
    <UPageCard
        v-if="canManagePasskeys"
        title="Passkeys"
        description="Manage your passkeys for passwordless sign-in"
        variant="subtle"
    >
        <div class="overflow-hidden rounded-lg border border-default">
            <template v-if="passkeys.length">
                <PasskeyItem
                    v-for="passkey in passkeys"
                    :key="passkey.id"
                    :passkey="passkey"
                    @remove="handleDelete"
                />
            </template>

            <div v-else class="p-8 text-center">
                <div
                    class="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-elevated"
                >
                    <UIcon
                        name="i-lucide-key-round"
                        class="size-7 text-muted"
                    />
                </div>
                <p class="font-medium text-highlighted">No passkeys yet</p>
                <p class="mt-1 text-sm text-muted">
                    Add a passkey to sign in without a password
                </p>
            </div>
        </div>

        <PasskeyRegister @success="handleRegisterSuccess" />
    </UPageCard>
</template>
