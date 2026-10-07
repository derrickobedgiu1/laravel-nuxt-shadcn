<script setup lang="ts">
import { useTemplateRef } from 'vue';
import { usePreserveInputValue } from '@/composables/usePreserveInputValue';

defineOptions({ inheritAttrs: false });

const input = useTemplateRef('input');
const { save, restore } = usePreserveInputValue(() => input.value?.inputRef);

defineExpose({
    focus: () => input.value?.inputRef?.focus(),
});
</script>

<template>
    <UInput
        ref="input"
        v-bind="$attrs"
        class="w-full"
        :onVnodeBeforeUpdate="save"
        :onVnodeUpdated="restore"
    >
        <template v-for="(_, name) in $slots" #[name]="slotProps">
            <slot :name="name" v-bind="slotProps ?? {}" />
        </template>
    </UInput>
</template>
