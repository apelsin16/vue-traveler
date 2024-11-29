<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { MapboxMap, MapboxMarker } from '@studiometa/vue-mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { mapSettings } from '../map/settings'
import FavoritePlaces from '../components/FavoritePlaces/FavoritePlaces.vue'
import MarkerIcon from '../components/icons/MarkerIcon.vue'
import { addFavoritePlaces, getFavoritePlaces } from '@/api/favorite-places'
import { useModal } from '@/composables/useModal'
import CreateNewPlaceModal from '@/components/CreateNewPlaceModal/CreateNewPlaceModal.vue'
import { useMutation } from '@/composables/useMutation'
import UserInfo from '@/components/UserInfo/UserInfo.vue'
import LogoutButton from '@/components/LogoutButton/LogoutButton.vue'

const {
  mutation: getPlaces,
  data,
  isLoading: isPlacesLoading,
} = useMutation({
  mutationFn: () => getFavoritePlaces(),
})

const activeId = ref(null)
const location = reactive({
  lat: 0,
  long: 0,
})
const mapMarkerLngLat = ref(null)
const { isOpen, openModal, closeModal } = useModal()
const {
  mutation: addPlace,
  isLoading: isLoadingPlaces,
  error,
} = useMutation({
  mutationFn: newPlace => addFavoritePlaces(newPlace),
  onSuccess: () => {
    closeModal()
    mapMarkerLngLat.value = null
    getPlaces()
  },
})
const favoritePlaces = computed(() => data.value ?? [])

onMounted(() => {
  const success = position => {
    location.lat = position.coords.latitude
    location.long = position.coords.longitude
  }

  const error = error => {
    console.log(error)
  }

  navigator.geolocation.getCurrentPosition(success, error)

  getPlaces()
})

const changeActiveId = id => {
  activeId.value = id
}

const changePlace = id => {
  const { coordinates } = favoritePlaces.value.find(place => place.id === id)
  changeActiveId(id)
  location.long = coordinates[0]
  location.lat = coordinates[1]
}

const handleMapClick = ({ lngLat }) => {
  mapMarkerLngLat.value = [lngLat.lng, lngLat.lat]
}

const handleAddPlace = async (formData, resetForm) => {
  const body = {
    ...formData,
    coordinates: mapMarkerLngLat.value,
  }

  await addPlace(body)

  resetForm()
}
</script>

<template>
  <main class="flex h-screen">
    <div class="bg-white h-full w-[400px] shrink-0 overflow-auto pb-10">
      <UserInfo />
      <div v-if="isPlacesLoading" class="text-grey p-6">Loading...</div>
      <FavoritePlaces
        :items="favoritePlaces"
        :active-id="activeId"
        :isLoadingPlaces="isLoadingPlaces"
        @place-clicked="changePlace"
        @create="openModal"
        @updated="getPlaces"
      />
      <LogoutButton class="mt-10" />
      <CreateNewPlaceModal
        :is-open="isOpen"
        :is-loading="isLoading"
        :has-error="error"
        @close="closeModal"
        @submit="handleAddPlace"
      />
    </div>
    <div class="w-full flex items-center justify-center text-6xl">
      <MapboxMap
        class="w-full h-full"
        :zoom="10"
        :center="[location.long, location.lat]"
        :access-token="mapSettings.apiToken"
        :map-style="mapSettings.style"
        @mb-click="handleMapClick"
      >
        <MapboxMarker
          v-if="mapMarkerLngLat"
          :lngLat="mapMarkerLngLat"
          anchor="bottom"
        >
          <button @click="changeActiveId(place.id)">
            <MarkerIcon class="h-8 w-8" is-active />
          </button>
        </MapboxMarker>
        <MapboxMarker
          v-for="place in favoritePlaces"
          :key="place.id"
          :lngLat="place.coordinates"
          anchor="bottom"
        >
          <button @click.stop="changeActiveId(place.id)">
            <MarkerIcon class="h-8 w-8" />
          </button>
        </MapboxMarker>
      </MapboxMap>
    </div>
  </main>
</template>
