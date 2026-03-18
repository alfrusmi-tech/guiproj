<script setup lang="ts">
import { watch } from "vue"
import type { Product } from "../types/product"

const props = defineProps<{
  product: Product | null
  isOpen: boolean
}>()

const emit = defineEmits<{
  close: []
}>()

function closeModal() {
  emit('close')
}

// Close modal when clicking outside
function handleBackdropClick(event: MouseEvent) {
  if (event.target === event.currentTarget) {
    closeModal()
  }
}

// Close modal on Escape key
watch(() => props.isOpen, (isOpen) => {
  if (isOpen) {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal()
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }
})
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="isOpen"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        @click="handleBackdropClick"
      >
        <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
          <div v-if="product" class="space-y-4">
            <!-- Close button -->
            <button
              @click="closeModal"
              class="float-right text-gray-500 hover:text-gray-700 text-xl font-bold"
            >
              ×
            </button>
            
            <!-- Product details -->
            <img :src="product.thumbnail" class="w-full h-48 object-cover rounded" />
            <h2 class="text-2xl font-bold">{{ product.title }}</h2>
            <p class="text-gray-600">{{ product.description }}</p>
            <p class="text-blue-500 font-bold text-xl">${{ product.price }}</p>
            <p class="text-sm text-gray-500">Category: {{ product.category }}</p>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>