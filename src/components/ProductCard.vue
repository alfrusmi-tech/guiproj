<script setup lang="ts">
import { inject, type Ref } from "vue"
import type { Product } from "../types/product"
import { useRouter } from "vue-router"

const isDark = inject<Ref<boolean>>("isDark")!
const router = useRouter()

const props = defineProps<{
  product: Product
}>()

function openDetail() {
  router.push(`/product/${props.product.id}`)
}
</script>

<template>
  <div
  @click="openDetail"
  :class="[
    'border rounded p-4 shadow hover:shadow-xl cursor-pointer transition',
    isDark ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-black'
  ]"
>
    <img
      :src="product.thumbnail"
      class="w-full h-40 object-cover"
      alt="product image"
    />

    <h2 class="font-bold mt-2">
      {{ product.title }}
    </h2>

    <p class="text-blue-500 dark:text-blue-400 font-semibold">
      ${{ product.price }}
    </p>
  </div>
</template>