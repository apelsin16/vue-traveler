<script setup>
import { reactive, toRaw } from 'vue'
import IInput from '@/components/IInput/IInput.vue'
import IButton from '@/components/IButton/IButton.vue'

const props = defineProps({
  isLoading: {
    default: false,
    type: Boolean,
  },
})

const emit = defineEmits(['submit'])
const userData = reactive({
  email: '',
  password: '',
})
</script>

<template>
  <form @submit.prevent="emit('submit', toRaw(userData))">
    <IInput class="mb-4" v-model="userData.email" label="Електронна пошта" />
    <IInput v-model="userData.password" type="password" label="Пароль" />
    <IButton
      class="mt-10 w-full"
      variant="gradient"
      type="submit"
      :is-loading="props.isLoading"
    >
      Увійти
    </IButton>
  </form>
</template>
