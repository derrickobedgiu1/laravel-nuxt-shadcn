<script setup lang="ts">
import { Form, Head } from '@inertiajs/vue3';
import TextInput from '@/components/TextInput.vue';
import PasswordInput from '@/components/PasswordInput.vue';
import TextLink from '@/components/TextLink.vue';
import { login } from '@/routes';
import { store } from '@/routes/register';

defineProps<{
    passwordRules: string;
}>();

defineOptions({
    layout: {
        title: 'Create an account',
        description: 'Enter your details below to create your account',
    },
});
</script>

<template>
    <Head title="Register" />

    <Form
        v-bind="store.form()"
        :reset-on-success="['password', 'password_confirmation']"
        v-slot="{ errors, processing }"
        class="flex flex-col gap-6"
    >
        <div class="grid gap-6">
            <UFormField label="Name" :error="errors.name">
                <TextInput
                    type="text"
                    name="name"
                    required
                    autofocus
                    autocomplete="name"
                    placeholder="Full name"
                />
            </UFormField>

            <UFormField label="Email address" :error="errors.email">
                <TextInput
                    type="email"
                    name="email"
                    required
                    autocomplete="email"
                    placeholder="email@example.com"
                />
            </UFormField>

            <UFormField label="Password" :error="errors.password">
                <PasswordInput
                    name="password"
                    required
                    autocomplete="new-password"
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
                    required
                    autocomplete="new-password"
                    placeholder="Confirm password"
                    :passwordrules="passwordRules"
                />
            </UFormField>

            <UButton
                type="submit"
                label="Create account"
                block
                class="mt-2"
                :loading="processing"
                data-test="register-user-button"
            />
        </div>

        <div class="text-center text-sm text-muted">
            Already have an account?
            <TextLink :href="login()">Log in</TextLink>
        </div>
    </Form>
</template>
