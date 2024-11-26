<script setup>
import LoginForm from './components/Auth/LoginForm/LoginForm.vue'
import RegistrationForm from './components/Auth/RegistrationForm/RegistrationForm.vue'

// import FavoritePlaces from './components/FavoritePlaces/FavoritePlaces.vue'
// import HomepageView from './views/HomepageView.vue'
</script>

<template>
  <RegistrationForm @submit="console.log" />
  <LoginForm />
  <!-- <HomepageView /> -->
  <!-- <FavoritePlaces /> -->
</template>
