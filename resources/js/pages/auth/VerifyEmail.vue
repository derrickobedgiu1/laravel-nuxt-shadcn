<script setup lang="ts">
import { Form, Head } from '@inertiajs/vue3';
import TextLink from '@/components/TextLink.vue';
import { logout } from '@/routes';
import { send } from '@/routes/verification';

defineOptions({
    layout: {
        title: 'Email verification',
        description:
            'Please verify your email address by clicking on the link we just emailed to you.',
    },
});

defineProps<{
    status?: string;
}>();
</script>

<template>
    <Head title="Email verification" />

    <UAlert
        v-if="status === 'verification-link-sent'"
        color="success"
        variant="subtle"
        title="A new verification link has been sent to the email address you provided during registration."
        class="mb-4"
    />

    <Form
        v-bind="send.form()"
        class="space-y-6 text-center"
        v-slot="{ processing }"
    >
        <UButton
            type="submit"
            label="Resend verification email"
            color="neutral"
            variant="subtle"
            :loading="processing"
        />

        <TextLink :href="logout()" as="button" class="mx-auto block text-sm">
            Log out
        </TextLink>
    </Form>
</template>
