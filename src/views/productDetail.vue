<script setup lang="ts">
import { ref, onMounted, inject, type Ref } from "vue"
import { useRoute } from "vue-router"
import { getProduct } from "../services/api"
import { useCartStore } from "../stores/cart"
import type { Product } from "../types/product"
import { convertToLKR } from "../utils/currency"

const route = useRoute()
const cartStore = useCartStore()
const isDark = inject<Ref<boolean>>("isDark")!          // ← ADD THIS

const product = ref<Product | null>(null)

onMounted(async () => {
  const id = Number(route.params.id)
  product.value = await getProduct(id)
})

function addToCart() {                                  // ← ADD THIS
  if (product.value) {
    cartStore.addToCart(product.value)
  }
}
</script>

<template>
  <div
    v-if="product"
    :class="['p-6 max-w-3xl mx-auto', isDark ? 'text-white' : 'text-black']"
  >
    <img
      :src="product.thumbnail"
      class="w-full h-72 object-cover rounded-lg mb-6"
      alt="product image"
    />

    <h1 class="text-2xl font-bold mb-2">{{ product.title }}</h1>

    <p :class="['mb-4', isDark ? 'text-gray-300' : 'text-gray-700']">
      {{ product.description }}
    </p>

    <p class="text-blue-500 font-bold text-xl mb-2">{{ convertToLKR(product.price) }}</p>

    <p class="mb-1"><span class="font-semibold">Category:</span> {{ product.category }}</p>
    <p class="mb-4"><span class="font-semibold">Brand:</span> {{ product.brand }}</p>

    <button
      @click="addToCart"
      class="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg transition"
    >
      Add to Cart
    </button>
  </div>
</template>