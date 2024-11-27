<script setup>
import { computed, reactive } from 'vue'
import IButton from '../IButton/IButton.vue'
import MarkerIcon from '../icons/MarkerIcon.vue'
import IInput from '../IInput/IInput.vue'
import IModal from '../IModal/IModal.vue'
import InputImage from '../InputImage/InputImage.vue'

const props = defineProps({
  isOpen: {
    default: false,
    type: Boolean,
  },
})

const formData = reactive({
  title: '',
  description: '',
  img: '',
})

const emit = defineEmits(['close', 'submit'])

const handleUpload = url => {
  formData.img = url
}
const uploadText = computed(() =>
  formData.img
    ? 'Натисніть тут, щоб змінити фото'
    : 'Натисніть тут, щоб додати фото',
)
</script>

<template>
  <IModal v-if="props.isOpen" @close="emit('close')">
    <form @submit.prevent="emit('submit', formData)" class="max-w-[420px]">
      <div class="flex gap-1 font-bold justify-center mb-10">
        <MarkerIcon /> Додати маркер
      </div>
      <IInput label="Локація" class="mb-4" v-model="formData.title" />
      <IInput
        type="textarea"
        label="Опис"
        class="mb-2"
        v-model="formData.description"
      />
      <div class="flex gap-1 items-center mb-10">
        <img
          v-if="formData.img"
          :src="formData.img"
          alt="Завантажуване зображення"
          class="w-8 h-8 object-cover"
        />
        <InputImage @uploaded="handleUpload">
          {{ uploadText }}
        </InputImage>
      </div>
      <IButton class="w-full" variant="gradient">Додати</IButton>
    </form>
  </IModal>
</template>
<!-- <InputImage @uploaded="base64 => (imageUrlBase64 = base64)"
>Натисніть тут, щоб додати фото</InputImage
> -->
