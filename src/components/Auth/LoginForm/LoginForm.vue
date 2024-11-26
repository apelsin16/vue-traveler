<script setup>
import { reactive, watch } from 'vue'
import IInput from '@/components/IInput/IInput.vue'
import IButton from '@/components/IButton/IButton.vue'
import FormContainer from '../FormContainer.vue'
const emit = defineEmits(['submit'])
const userData = reactive({
  email: '',
  password: '',
})
watch(userData, () => {
  console.log('User data changed')
})
</script>

<template>
  <FormContainer @submit.prevent="emit('submit', toRaw(userData))">
    <IInput class="mb-4" v-model="userData.email" label="Електронна пошта" />
    <IInput v-model="userData.password" type="password" label="Пароль" />
    <IButton class="mt-10 w-full" variant="gradient" type="submit">
      Увійти
    </IButton>
  </FormContainer>
</template>
