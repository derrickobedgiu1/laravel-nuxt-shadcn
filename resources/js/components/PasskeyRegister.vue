<script setup lang="ts">
import { usePasskeyRegister } from '@laravel/passkeys/vue';
import { ref } from 'vue';

const emit = defineEmits<{
    success: [];
}>();

const getDefaultPasskeyName = () => {
    const ua = navigator.userAgent;

    const browser = [
        { pattern: /Edg|Edge/, name: 'Edge' },
        { pattern: /OPR|Opera|OPiOS/, name: 'Opera' },
        { pattern: /Firefox|FxiOS/, name: 'Firefox' },
        { pattern: /Chrome|CriOS/, name: 'Chrome' },
        { pattern: /Safari/, name: 'Safari' },
    ].find(({ pattern }) => pattern.test(ua))?.name;

    const os = [
        { pattern: /iPhone/, name: 'iPhone' },
        { pattern: /iPad|Macintosh(?=.*Mobile)/, name: 'iPad' },
        { pattern: /Android/, name: 'Android' },
        { pattern: /Mac/, name: 'Mac' },
        { pattern: /Windows/, name: 'Windows' },
    ].find(({ pattern }) => pattern.test(ua))?.name;

    return [browser, os].filter(Boolean).join(' on ') || '';
};

const name = ref(getDefaultPasskeyName());
const showForm = ref(false);

const { register, isLoading, error, isSupported } = usePasskeyRegister({
    onSuccess: () => {
        name.value = '';
        showForm.value = false;
        emit('success');
    },
});

const handleSubmit = async (event: Event) => {
    event.preventDefault();

    if (!name.value.trim()) {
        return;
    }

    await register(name.value);
};

const handleCancel = () => {
    showForm.value = false;
    name.value = '';
};
</script>

<template>
    <p v-if="!isSupported" class="text-sm text-muted">
        Passkeys are not supported in this browser.
    </p>

    <UButton
        v-else-if="!showForm"
        label="Add passkey"
        color="neutral"
        variant="outline"
        @click="showForm = true"
    />

    <form
        v-else
        @submit="handleSubmit"
        class="space-y-4 rounded-lg border border-default bg-elevated/50 p-4"
    >
        <UFormField
            label="Passkey name"
            help="A name helps you identify this passkey later."
            :error="error || undefined"
        >
            <UInput
                v-model="name"
                type="text"
                placeholder="e.g., MacBook Pro, iPhone"
                autofocus
                class="w-full"
            />
        </UFormField>

        <div class="flex gap-2">
            <UButton
                type="submit"
                :label="isLoading ? 'Registering...' : 'Register passkey'"
                :loading="isLoading"
                :disabled="!name.trim()"
            />
            <UButton
                type="button"
                label="Cancel"
                color="neutral"
                variant="ghost"
                @click="handleCancel"
            />
        </div>
    </form>
</template>
