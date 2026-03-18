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

<img :src="product.thumbnail" class="w-64" />
<h1 class="text-2xl font-bold">{{ product.title }}</h1>
<p>{{ product.description }}</p>
<p class="text-blue-500 font-bold">${{ product.price }}</p>

</div>
<button
  class="mb-4 bg-blue-500 text-white px-4 py-2 rounded"
  @click="$router.back()"
>
  Back
</button>

</template>