<script setup>
import RegistrationForm from '@/components/Auth/RegistrationForm/RegistrationForm.vue'
import { useMutation } from '@/composables/useMutation'
import { authService } from '@/api/authService'
import { useRouter } from 'vue-router'

const router = useRouter()
const {
  isLoading,
  error,
  mutation: handleRegisterUser,
} = useMutation({
  mutationFn: data => authService.registerUser(data),
  onSuccess: () => router.replace('/map'),
})
</script>

<template>
  <RegistrationForm @submit="handleRegisterUser" :isLoading="isLoading" />
  <div v-if="error" class="text-red-500">{{ error.message }}</div>
</template>
