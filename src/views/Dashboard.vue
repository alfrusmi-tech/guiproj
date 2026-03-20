<script setup lang="ts">

import { ref, onMounted, computed } from "vue"
import { getProducts } from "../services/api"
import type { Product } from "../types/product"

const products = ref<Product[]>([])

onMounted(async () => {
  products.value = await getProducts()
})

const totalProducts = computed(() => products.value.length)
const totalValue = computed(() => products.value.reduce((sum, p) => sum + p.price, 0))
const categories = computed(() => [...new Set(products.value.map(p => p.category))])
const avgPrice = computed(() =>
  totalProducts.value > 0 ? totalValue.value / totalProducts.value : 0
)
</script>

<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">E-commerce Dashboard</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="bg-blue-100 dark:bg-blue-900 p-4 rounded shadow">
        <h2 class="font-bold">Total Products</h2>
        <p class="text-2xl">{{ totalProducts }}</p>
      </div>

      <div class="bg-green-100 dark:bg-green-900 p-4 rounded shadow">
        <h2 class="font-bold">Total Value</h2>
        <p class="text-2xl">${{ totalValue.toFixed(2) }}</p>
      </div>

      <div class="bg-yellow-100 dark:bg-yellow-800 p-4 rounded shadow">
        <h2 class="font-bold">Categories</h2>
        <p class="text-2xl">{{ categories.length }}</p>
      </div>

      <div class="bg-purple-100 dark:bg-purple-900 p-4 rounded shadow">
        <h2 class="font-bold">Average Price</h2>
        <p class="text-2xl">${{ avgPrice.toFixed(2) }}</p>
      </div>
    </div>

    <div class="mt-8">
      <h2 class="text-xl font-bold mb-4">Products by Category</h2>
      <ul class="list-disc pl-5">
        <li v-for="cat in categories" :key="cat">
          {{ cat }}: {{ products.filter(p => p.category === cat).length }} products
        </li>
      </ul>
    </div>
  </div>
</template>