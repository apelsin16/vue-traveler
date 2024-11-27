<script setup>
import { onMounted, reactive } from 'vue'
import FavoritePlaces from './components/FavoritePlaces/FavoritePlaces.vue'
import { MapboxMap } from '@studiometa/vue-mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { mapSettings } from './map/settings'
const location = reactive({
  lat: 0,
  long: 0,
})

onMounted(() => {
  const success = position => {
    location.lat = position.coords.latitude
    location.long = position.coords.longitude

    // Do something with the position
  }

  const error = error => {
    console.log(error)
  }

  navigator.geolocation.getCurrentPosition(success, error)
})
</script>

<template>
  <main class="flex h-screen">
    <div class="bg-white h-full w-[400px] shrink-0 overflow-auto pb-10">
      <FavoritePlaces />
    </div>
    <div class="w-full flex items-center justify-center text-6xl">
      <MapboxMap
        class="w-full h-full"
        :zoom="10"
        :center="[location.long, location.lat]"
        :access-token="mapSettings.apiToken"
        :map-style="mapSettings.style"
      />
    </div>
  </main>
</template>
