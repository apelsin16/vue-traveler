<script setup>
import BaseLayout from '@/layout/BaseLayout.vue'
import { RouterView, RouterLink } from 'vue-router'
</script>

<template>
  <BaseLayout>
    <section class="max-w-[500px] w-full bg-white p-10 rounded-xl">
      <div class="flex justify-center gap-10 mb-10">
        <router-link
          to="registration"
          class="text-grey font-bold"
          exact-active-class="text-primary"
        >
          Створити акаунт
        </router-link>
        <router-link
          to="login"
          class="text-grey font-bold"
          exact-active-class="text-primary"
          >Увійти</router-link
        >
      </div>
      <router-view />
    </section>
  </BaseLayout>
</template>
