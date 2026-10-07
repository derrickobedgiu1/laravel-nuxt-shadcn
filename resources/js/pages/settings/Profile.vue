<script setup lang="ts">
import { Form, Head, usePage } from '@inertiajs/vue3';
/* @chisel-email-verification */
import { Link } from '@inertiajs/vue3';
/* @end-chisel-email-verification */
import { computed } from 'vue';
import ProfileController from '@/actions/App/Http/Controllers/Settings/ProfileController';
import TextInput from '@/components/TextInput.vue';
import DeleteUser from '@/components/DeleteUser.vue';
/* @chisel-email-verification */
import { send } from '@/routes/verification';
/* @end-chisel-email-verification */

const page = usePage();
const user = computed(() => page.props.auth.user);
</script>

<template>
    <Head title="Profile settings" />

    <h1 class="sr-only">Profile settings</h1>

    <UPageCard
        title="Profile"
        description="Update your name and email address"
        variant="subtle"
    >
        <Form
            v-bind="ProfileController.update.form()"
            class="space-y-6"
            v-slot="{ errors, processing }"
        >
            <UFormField label="Name" :error="errors.name">
                <TextInput
                    name="name"
                    :default-value="user.name"
                    required
                    autocomplete="name"
                    placeholder="Full name"
                />
            </UFormField>

            <UFormField label="Email address" :error="errors.email">
                <TextInput
                    type="email"
                    name="email"
                    :default-value="user.email"
                    required
                    autocomplete="username"
                    placeholder="Email address"
                />
            </UFormField>

            <!-- @chisel-email-verification -->
            <div v-if="page.props.mustVerifyEmail && !user.email_verified_at">
                <p class="-mt-4 text-sm text-muted">
                    Your email address is unverified.
                    <Link
                        :href="send()"
                        as="button"
                        class="decoration-accented text-highlighted underline underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current"
                    >
                        Click here to re-send the verification email.
                    </Link>
                </p>

                <p
                    v-if="page.props.status === 'verification-link-sent'"
                    class="mt-2 text-sm font-medium text-success"
                >
                    A new verification link has been sent to your email address.
                </p>
            </div>
            <!-- @end-chisel-email-verification -->

            <UButton
                type="submit"
                label="Save"
                :loading="processing"
                data-test="update-profile-button"
            />
        </Form>
    </UPageCard>

    <DeleteUser />
</template>
