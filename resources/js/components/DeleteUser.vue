<script setup lang="ts">
import { Form } from '@inertiajs/vue3';
import { useTemplateRef } from 'vue';
import ProfileController from '@/actions/App/Http/Controllers/Settings/ProfileController';
import PasswordInput from '@/components/PasswordInput.vue';

const passwordInput = useTemplateRef('passwordInput');
</script>

<template>
    <UPageCard
        title="Delete account"
        description="Delete your account and all of its resources"
        variant="subtle"
    >
        <UAlert
            color="error"
            variant="subtle"
            title="Warning"
            description="Please proceed with caution, this cannot be undone."
        >
            <template #actions>
                <UModal>
                    <UButton
                        label="Delete account"
                        color="error"
                        data-test="delete-user-button"
                    />

                    <template #content="{ close }">
                        <Form
                            v-bind="ProfileController.destroy.form()"
                            reset-on-success
                            @error="() => passwordInput?.focus()"
                            :options="{
                                preserveScroll: true,
                            }"
                            class="space-y-6 p-6"
                            v-slot="{ errors, processing, reset, clearErrors }"
                        >
                            <div class="space-y-2">
                                <h2
                                    class="text-lg font-semibold text-highlighted"
                                >
                                    Are you sure you want to delete your
                                    account?
                                </h2>
                                <p class="text-sm text-muted">
                                    Once your account is deleted, all of its
                                    resources and data will also be permanently
                                    deleted. Please enter your password to
                                    confirm you would like to permanently delete
                                    your account.
                                </p>
                            </div>

                            <UFormField
                                label="Password"
                                :error="errors.password"
                                :ui="{ label: 'sr-only' }"
                            >
                                <PasswordInput
                                    ref="passwordInput"
                                    name="password"
                                    placeholder="Password"
                                    autofocus
                                />
                            </UFormField>

                            <div class="flex justify-end gap-2">
                                <UButton
                                    label="Cancel"
                                    color="neutral"
                                    variant="subtle"
                                    @click="
                                        () => {
                                            clearErrors();
                                            reset();
                                            close();
                                        }
                                    "
                                />
                                <UButton
                                    type="submit"
                                    label="Delete account"
                                    color="error"
                                    :loading="processing"
                                    data-test="confirm-delete-user-button"
                                />
                            </div>
                        </Form>
                    </template>
                </UModal>
            </template>
        </UAlert>
    </UPageCard>
</template>
