<script setup lang="ts">
import { inject, type Ref } from "vue"
import type { Product } from "../types/product"

const isDark = inject<Ref<boolean>>("isDark")!

defineProps<{
  product: Product
}>()

const emit = defineEmits<{
  (e: "open", product: Product): void
}>()
</script>

<template>
  <div
    @click="emit('open', product)"
    :class="[
      'border rounded p-4 shadow hover:shadow-xl hover:scale-[1.02] cursor-pointer transition',
      isDark ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-black'
    ]"
  >
    <img
      :src="product.thumbnail"
      class="w-full h-40 object-cover rounded"
      alt="product image"
    />

    <h2 class="font-bold mt-2">
      {{ product.title }}
    </h2>

    <p class="text-blue-500 font-semibold">
      ${{ product.price }}
    </p>
  </div>
</template>