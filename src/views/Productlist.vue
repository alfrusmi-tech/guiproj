<script setup lang="ts">
import { ref, onMounted, computed } from "vue"
import { getProducts } from "../services/api"
import type { Product } from "../types/product"
import ProductCard from "../components/ProductCard.vue"

const props = withDefaults(
  defineProps<{ search?: string }>(),
  { search: "" }
)

const products = ref<Product[]>([])

onMounted(async () => {
  products.value = await getProducts()
})

const filteredProducts = computed(() => {
  const term = props.search?.toLowerCase().trim() ?? ""
  if (!term) return products.value

  return products.value.filter((p) =>
    p.title.toLowerCase().includes(term) ||
    p.description?.toLowerCase().includes(term)
  )
})
</script>

<template>

<div class="p-4">

<div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">

<ProductCard
v-for="product in filteredProducts"
:key="product.id"
:product="product"
/>

</div>

</div>

</template>