<script setup>
import FavoritePlace from '../FavoritePlace/FavoritePlace.vue'
import IButton from '../IButton/IButton.vue'
import EditPlaceModal from '../EditPlaceModal/EditPlaceModal.vue'
import { useModal } from '@/composables/useModal'
import { computed, ref, nextTick } from 'vue'
import { useMutation } from '@/composables/useMutation'
import {
  deleteFavoritePlaces,
  updateFavoritePlaces,
} from '@/api/favorite-places'
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal.vue'

const props = defineProps({
  items: {
    required: true,
    type: Array,
  },
  activeId: {
    required: true,
    type: [String, null],
  },
  isLoadingPlaces: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['place-clicked', 'create', 'updated'])

const selectedId = ref(null)
const selectedItem = computed(() =>
  props.items.find(place => place.id === selectedId.value),
)
const deletedId = ref(null)

const {
  isOpen: isOpenEditModal,
  openModal: openEditModal,
  closeModal: closeEditModal,
} = useModal()

const {
  isOpen: isOpenConfirmationModal,
  openModal: openConfirmationModal,
  closeModal: closeConfirmationModal,
} = useModal()

const { mutation: updatePlace, isLoading } = useMutation({
  mutationFn: formData => updateFavoritePlaces(formData),
  onSuccess: () => {
    closeEditModal()
    emit('updated')
  },
})
const {
  mutation: deletePlace,
  isLoading: isDeleting,
  error: deleteError,
} = useMutation({
  mutationFn: id => deleteFavoritePlaces(id),
  onSuccess: () => {
    closeConfirmationModal()
    deletedId.value = null
    emit('updated')
  },
})

const handleEditPlace = id => {
  selectedId.value = id
  nextTick(() => {
    openEditModal()
  })
}

const handleSubmit = formData => {
  updatePlace(formData)
}

const handleOpenConfirmationModal = id => {
  deletedId.value = id
  openConfirmationModal()
}

const handleDeletePlace = () => {
  deletePlace(deletedId.value)
}
</script>

<template>
  <div class="px-6">
    <div class="text-grey mb-4">Додані маркери</div>
    <slot name="label"></slot>
    <slot name="list">
      <div v-if="props.items.length === 0 && !isLoadingPlaces">
        Немає улюблених місць
      </div>
      <FavoritePlace
        v-for="place in props.items"
        :key="place.id"
        :title="place.title"
        :description="place.description"
        :img="place.img"
        :is-active="place.id === props.activeId"
        @click="emit('place-clicked', place.id)"
        @edit="handleEditPlace(place.id)"
        @delete="handleOpenConfirmationModal(place.id)"
      />
      <EditPlaceModal
        :is-open="isOpenEditModal"
        :is-loading="isLoading"
        :place="selectedItem"
        @close="closeEditModal"
        @submit="handleSubmit"
      />

      <ConfirmationModal
        :is-open="isOpenConfirmationModal"
        :is-loading="isDeleting"
        :has-error="deleteError"
        @cancel="closeConfirmationModal"
        @confirm="handleDeletePlace"
        title="Ви дійсно бажаєте видалити це місце?"
      />
    </slot>
    <IButton class="w-full mt-10" variant="gradient" @click="emit('create')">
      Додати маркер
    </IButton>
  </div>
</template>
