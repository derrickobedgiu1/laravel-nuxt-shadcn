<script setup lang="ts">
import { Form, Head } from '@inertiajs/vue3';
import SecurityController from '@/actions/App/Http/Controllers/Settings/SecurityController';
import PasswordInput from '@/components/PasswordInput.vue';
/* @chisel-passkeys */
import type { Props as ManagePasskeysProps } from '@/components/ManagePasskeys.vue';
import ManagePasskeys from '@/components/ManagePasskeys.vue';
/* @end-chisel-passkeys */
/* @chisel-2fa */
import type { Props as ManageTwoFactorProps } from '@/components/ManageTwoFactor.vue';
import ManageTwoFactor from '@/components/ManageTwoFactor.vue';
/* @end-chisel-2fa */

// oxfmt-ignore
type Props = {
    passwordRules: string;
} /* @chisel-passkeys */ & ManagePasskeysProps /* @end-chisel-passkeys */ /* @chisel-2fa */ &
    ManageTwoFactorProps /* @end-chisel-2fa */;

const props = defineProps<Props>();
</script>

<template>
    <Head title="Security settings" />

    <h1 class="sr-only">Security settings</h1>

    <UPageCard
        title="Update password"
        description="Ensure your account is using a long, random password to stay secure"
        variant="subtle"
    >
        <Form
            v-bind="SecurityController.update.form()"
            :options="{
                preserveScroll: true,
            }"
            reset-on-success
            :reset-on-error="[
                'password',
                'password_confirmation',
                'current_password',
            ]"
            class="space-y-6"
            v-slot="{ errors, processing }"
        >
            <UFormField
                label="Current password"
                :error="errors.current_password"
            >
                <PasswordInput
                    name="current_password"
                    autocomplete="current-password"
                    placeholder="Current password"
                />
            </UFormField>

            <UFormField label="New password" :error="errors.password">
                <PasswordInput
                    name="password"
                    autocomplete="new-password"
                    placeholder="New password"
                    :passwordrules="props.passwordRules"
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
                    :passwordrules="props.passwordRules"
                />
            </UFormField>

            <UButton
                type="submit"
                label="Save"
                :loading="processing"
                data-test="update-password-button"
            />
        </Form>
    </UPageCard>

    <!-- @chisel-2fa -->
    <ManageTwoFactor
        :canManageTwoFactor="canManageTwoFactor"
        :requiresConfirmation="requiresConfirmation"
        :twoFactorEnabled="twoFactorEnabled"
    />
    <!-- @end-chisel-2fa -->

    <!-- @chisel-passkeys -->
    <ManagePasskeys
        :canManagePasskeys="canManagePasskeys"
        :passkeys="passkeys"
    />
    <!-- @end-chisel-passkeys -->
</template>
