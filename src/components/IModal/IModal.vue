<script setup>
import { onMounted, onUnmounted, Teleport } from 'vue'
import CrossIcon from '../icons/CrossIcon.vue'

const emit = defineEmits(['close'])

onMounted(() => {
  document.body.style.overflow = 'hidden'
})
onUnmounted(() => {
  document.body.style.overflow = 'initial'
})
</script>

<template>
  <component :is="Teleport" to="body">
    <div
      class="flex w-full h-full fixed top-0 left-0 overflow-auto bg-overlay"
      @click.self="emit('close')"
    >
      <div
        class="relative bg-white min-w-[350px] m-auto text-black rounded-2xl p-10 shadow"
      >
        <button @click="emit('close')" class="absolute right-3 top-3">
          <CrossIcon class="w-6 h-6" />
        </button>

        <slot></slot>
      </div>
    </div>
  </component>
</template>
