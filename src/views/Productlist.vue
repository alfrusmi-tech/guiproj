<script setup lang="ts">

import { ref, onMounted, computed } from "vue"
import { getProducts } from "../services/api"
import type { Product } from "../types/product"
import ProductCard from "../components/ProductCard.vue"

const products = ref<Product[]>([])
const search = ref("")

onMounted(async () => {

products.value = await getProducts()

})

const filteredProducts = computed(() =>

products.value.filter(p =>
p.title.toLowerCase().includes(search.value.toLowerCase())
)

)

</script>

<template>

<div class="p-4">

<input
v-model="search"
placeholder="Search products..."
class="border p-2 mb-4 w-full"
/>

<div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">

<ProductCard
v-for="product in filteredProducts"
:key="product.id"
:product="product"
/>

</div>

</div>

</template>