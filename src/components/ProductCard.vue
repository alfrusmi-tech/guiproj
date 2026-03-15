<script setup lang="ts">
import type { Product } from "../types/product"

const props = defineProps<{
  product: Product
}>()

const emit = defineEmits<{
  productSelected: [product: Product]
}>()

function openDetail() {
  emit('productSelected', props.product)
}
</script>

<template>
  <div
    @click="openDetail"
    class="border rounded p-4 shadow hover:shadow-xl cursor-pointer transition"
  >
    <img :src="product.thumbnail" class="w-full h-40 object-cover" />
    <h2 class="font-bold mt-2">{{ product.title }}</h2>
    <p class="text-blue-500 font-semibold">${{ product.price }}</p>
  </div>
</template>