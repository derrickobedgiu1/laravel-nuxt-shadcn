<script setup lang="ts">
import { ref, useTemplateRef } from 'vue';
import TextInput from '@/components/TextInput.vue';

defineOptions({ inheritAttrs: false });

const showPassword = ref(false);
const input = useTemplateRef('input');

defineExpose({
    focus: () => input.value?.focus(),
});
</script>

<template>
    <TextInput
        ref="input"
        v-bind="$attrs"
        :type="showPassword ? 'text' : 'password'"
        :ui="{ trailing: 'pe-1' }"
    >
        <template #trailing>
            <UButton
                color="neutral"
                variant="link"
                size="sm"
                :icon="showPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                :aria-label="showPassword ? 'Hide password' : 'Show password'"
                :aria-pressed="showPassword"
                :tabindex="-1"
                @click="showPassword = !showPassword"
            />
        </template>
    </TextInput>
</template>
