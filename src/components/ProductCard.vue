<script setup lang="ts">
import type { Product } from "../types/product"
import { ref } from "vue"

interface Props {
  product: Product
  showCategory?: boolean
  showDescription?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showCategory: true,
  showDescription: false,
})

const emit = defineEmits<{
  productSelected: [product: Product]
  addToCart: [product: Product]
}>()

const isHovered = ref(false)

function openDetail(): void {
  emit('productSelected', props.product)
}

function handleAddToCart(event: Event): void {
  event.stopPropagation()
  emit('addToCart', props.product)
}

function truncateText(text: string, maxLength: number): string {
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text
}
</script>

<template>
  <div
    class="group relative h-full bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
    :class="{ 'ring-2 ring-blue-500': isHovered }"
    @click="openDetail"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <!-- Image Container -->
    <div class="relative overflow-hidden bg-gray-200 h-48 w-full">
      <img
        :src="product.thumbnail"
        :alt="product.title"
        class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
      />
      <div
        v-if="showCategory"
        class="absolute top-2 right-2 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold"
      >
        {{ product.category }}
      </div>
    </div>

    <!-- Content Container -->
    <div class="flex flex-col justify-between h-full p-4">
      <!-- Title -->
      <div>
        <h3
          class="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors"
        >
          {{ product.title }}
        </h3>

        <!-- Description (Optional) -->
        <p
          v-if="showDescription"
          class="text-sm text-gray-600 mb-2 line-clamp-2"
        >
          {{ truncateText(product.description, 80) }}
        </p>
      </div>

      <!-- Price and Action -->
      <div class="flex items-center justify-between pt-2 border-t border-gray-100">
        <p class="text-2xl font-bold text-blue-600">
          ${{ product.price.toFixed(2) }}
        </p>
        <button
          @click="handleAddToCart"
          class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-3 rounded-lg transition-colors duration-200 active:scale-95"
        >
          Add
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>