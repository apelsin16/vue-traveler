<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: String,
  label: String,
  placeholder: String,
  type: {
    default: 'text',
    type: String,
  },
})

defineOptions({
  inheritAttrs: false,
})

const emit = defineEmits(['update:modelValue'])
const baseStyles =
  'w-full text-sm rounded-[4px] brder-[#eaeaea] border-[1px] py-2 px-3 focus:outline-primary'
const inputStyles = computed(() =>
  isTextarea.value ? baseStyles + ' resize-none' : baseStyles,
)
const isTextarea = computed(() => props.type === 'textarea')
const componentName = computed(() => (isTextarea.value ? 'textarea' : 'input'))
</script>

<template>
  <div class="w-full text=[#2c2c2c]">
    <label class="block">
      <span class="block text-xs px-3 mb-2">{{ props.label }}</span>
      <component
        :is="componentName"
        rows="3"
        :class="inputStyles"
        @input="emit('update:modelValue', $event.target.value)"
        v-bind="{ ...$props, ...$attrs }"
      />
    </label>
  </div>
</template>
