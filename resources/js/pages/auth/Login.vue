<script setup lang="ts">
import { Form, Head } from '@inertiajs/vue3';
import TextInput from '@/components/TextInput.vue';
import PasswordInput from '@/components/PasswordInput.vue';
import TextLink from '@/components/TextLink.vue';
/* @chisel-registration */
import { register } from '@/routes';
/* @end-chisel-registration */
import { store } from '@/routes/login';
import { request } from '@/routes/password';
/* @chisel-passkeys */
import PasskeyVerify from '@/components/PasskeyVerify.vue';
/* @end-chisel-passkeys */

defineOptions({
    layout: {
        title: 'Log in to your account',
        description: 'Enter your email and password below to log in',
    },
});

defineProps<{
    status?: string;
    canResetPassword: boolean;
}>();
</script>

<template>
    <Head title="Log in" />

    <UAlert
        v-if="status"
        color="success"
        variant="subtle"
        :title="status"
        class="mb-4"
    />

    <!-- @chisel-passkeys -->
    <PasskeyVerify />
    <!-- @end-chisel-passkeys -->

    <Form
        v-bind="store.form()"
        :reset-on-success="['password']"
        v-slot="{ errors, processing }"
        class="flex flex-col gap-6"
    >
        <div class="grid gap-6">
            <UFormField label="Email address" :error="errors.email">
                <TextInput
                    type="email"
                    name="email"
                    required
                    autofocus
                    autocomplete="email"
                    placeholder="email@example.com"
                />
            </UFormField>

            <UFormField label="Password" :error="errors.password">
                <template v-if="canResetPassword" #hint>
                    <TextLink :href="request()" class="text-sm">
                        Forgot your password?
                    </TextLink>
                </template>
                <PasswordInput
                    name="password"
                    required
                    autocomplete="current-password"
                    placeholder="Password"
                />
            </UFormField>

            <UCheckbox name="remember" label="Remember me" />

            <UButton
                type="submit"
                label="Log in"
                block
                class="mt-2"
                :loading="processing"
                data-test="login-button"
            />
        </div>

        <!-- @chisel-registration -->
        <div class="text-center text-sm text-muted">
            Don't have an account?
            <TextLink :href="register()">Sign up</TextLink>
        </div>
        <!-- @end-chisel-registration -->
    </Form>
</template>
