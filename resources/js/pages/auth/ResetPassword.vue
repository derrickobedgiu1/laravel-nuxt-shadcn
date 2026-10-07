<script setup lang="ts">
import { Form, Head } from '@inertiajs/vue3';
import { ref } from 'vue';
import PasswordInput from '@/components/PasswordInput.vue';
import { update } from '@/routes/password';

defineOptions({
    layout: {
        title: 'Reset password',
        description: 'Please enter your new password below',
    },
});

const props = defineProps<{
    token: string;
    email: string;
    passwordRules: string;
}>();

const inputEmail = ref(props.email);
</script>

<template>
    <Head title="Reset password" />

    <Form
        v-bind="update.form()"
        :transform="(data) => ({ ...data, token, email })"
        :reset-on-success="['password', 'password_confirmation']"
        v-slot="{ errors, processing }"
    >
        <div class="grid gap-6">
            <UFormField label="Email" :error="errors.email">
                <UInput
                    v-model="inputEmail"
                    type="email"
                    name="email"
                    autocomplete="email"
                    readonly
                    class="w-full"
                />
            </UFormField>

            <UFormField label="Password" :error="errors.password">
                <PasswordInput
                    name="password"
                    autocomplete="new-password"
                    autofocus
                    placeholder="Password"
                    :passwordrules="passwordRules"
                />
            </UFormField>

            <UFormField
                label="Confirm password"
                :error="errors.password_confirmation"
            >
                <PasswordInput
                    name="password_confirmation"
                    autocomplete="new-password"
                    placeholder="Confirm password"
                    :passwordrules="passwordRules"
                />
            </UFormField>

            <UButton
                type="submit"
                label="Reset password"
                block
                class="mt-2"
                :loading="processing"
                data-test="reset-password-button"
            />
        </div>
    </Form>
</template>
