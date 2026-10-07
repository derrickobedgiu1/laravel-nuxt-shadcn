<script setup lang="ts">
import { Form, Head } from '@inertiajs/vue3';
import TextInput from '@/components/TextInput.vue';
import TextLink from '@/components/TextLink.vue';
import { login } from '@/routes';
import { email } from '@/routes/password';

defineOptions({
    layout: {
        title: 'Forgot password',
        description: 'Enter your email to receive a password reset link',
    },
});

defineProps<{
    status?: string;
}>();
</script>

<template>
    <Head title="Forgot password" />

    <UAlert
        v-if="status"
        color="success"
        variant="subtle"
        :title="status"
        class="mb-4"
    />

    <div class="space-y-6">
        <Form
            v-bind="email.form()"
            v-slot="{ errors, processing }"
            class="space-y-6"
        >
            <UFormField label="Email address" :error="errors.email">
                <TextInput
                    type="email"
                    name="email"
                    autocomplete="off"
                    autofocus
                    placeholder="email@example.com"
                />
            </UFormField>

            <UButton
                type="submit"
                label="Email password reset link"
                block
                :loading="processing"
                data-test="email-password-reset-link-button"
            />
        </Form>

        <div class="space-x-1 text-center text-sm text-muted">
            <span>Or, return to</span>
            <TextLink :href="login()">log in</TextLink>
        </div>
    </div>
</template>
