<script setup lang="ts">

import { ref, onMounted } from "vue"
import { useRoute } from "vue-router"
import { getProduct } from "../services/api"
import type { Product } from "../types/product"

const route = useRoute()

const product = ref<Product | null>(null)

onMounted(async () => {

const id = Number(route.params.id)
product.value = await getProduct(id)

})

</script>

<template>
  <div v-if="product" class="p-4">
    <img
      :src="product.thumbnail"
      class="w-64 mb-4"
      alt="product image"
    />

    <h1 class="text-2xl font-bold">
      {{ product.title }}
    </h1>

    <p class="mt-2 text-gray-700 dark:text-gray-300">
      {{ product.description }}
    </p>

    <p class="text-blue-500 dark:text-blue-400 font-bold mt-2">
      ${{ product.price }}
    </p>
  </div>
</template>