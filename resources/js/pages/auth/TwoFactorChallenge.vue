<script setup lang="ts">
import TextInput from '@/components/TextInput.vue';
import { Form, Head, setLayoutProps } from '@inertiajs/vue3';
import { computed, ref, watchEffect } from 'vue';
import { store } from '@/routes/two-factor/login';
import type { TwoFactorConfigContent } from '@/types';

const showRecoveryInput = ref<boolean>(false);
const code = ref<number[]>([]);

const authConfigContent = computed<TwoFactorConfigContent>(() => {
    if (showRecoveryInput.value) {
        return {
            title: 'Recovery code',
            description:
                'Please confirm access to your account by entering one of your emergency recovery codes.',
            buttonText: 'login using an authentication code',
        };
    }

    return {
        title: 'Authentication code',
        description:
            'Enter the authentication code provided by your authenticator application.',
        buttonText: 'login using a recovery code',
    };
});

watchEffect(() => {
    setLayoutProps({
        title: authConfigContent.value.title,
        description: authConfigContent.value.description,
    });
});

const toggleRecoveryMode = (clearErrors: () => void): void => {
    showRecoveryInput.value = !showRecoveryInput.value;
    clearErrors();
    code.value = [];
};
</script>

<template>
    <Head title="Two-factor authentication" />

    <div class="space-y-6">
        <template v-if="!showRecoveryInput">
            <Form
                v-bind="store.form()"
                class="space-y-4"
                reset-on-error
                @error="code = []"
                #default="{ errors, processing, clearErrors }"
            >
                <input type="hidden" name="code" :value="code.join('')" />
                <div
                    class="flex flex-col items-center justify-center space-y-3 text-center"
                >
                    <UPinInput
                        v-model="code"
                        :length="6"
                        type="number"
                        otp
                        autofocus
                        :disabled="processing"
                        :highlight="!!errors.code"
                        :color="errors.code ? 'error' : 'primary'"
                    />
                    <p v-if="errors.code" class="text-sm text-error">
                        {{ errors.code }}
                    </p>
                </div>
                <UButton
                    type="submit"
                    label="Continue"
                    block
                    :disabled="processing"
                />
                <div class="text-center text-sm text-muted">
                    <span>or you can </span>
                    <button
                        type="button"
                        class="decoration-accented text-highlighted underline underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current"
                        @click="() => toggleRecoveryMode(clearErrors)"
                    >
                        {{ authConfigContent.buttonText }}
                    </button>
                </div>
            </Form>
        </template>

        <template v-else>
            <Form
                v-bind="store.form()"
                class="space-y-4"
                reset-on-error
                #default="{ errors, processing, clearErrors }"
            >
                <UFormField :error="errors.recovery_code">
                    <TextInput
                        name="recovery_code"
                        type="text"
                        placeholder="Enter recovery code"
                        autofocus
                        required
                    />
                </UFormField>
                <UButton
                    type="submit"
                    label="Continue"
                    block
                    :disabled="processing"
                />

                <div class="text-center text-sm text-muted">
                    <span>or you can </span>
                    <button
                        type="button"
                        class="decoration-accented text-highlighted underline underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current"
                        @click="() => toggleRecoveryMode(clearErrors)"
                    >
                        {{ authConfigContent.buttonText }}
                    </button>
                </div>
            </Form>
        </template>
    </div>
</template>
