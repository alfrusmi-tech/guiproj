<script setup lang="ts">
import { ref, onMounted, computed } from "vue"
import { getProducts, getCategories, type Category } from "../services/api"
import type { Product } from "../types/product"
import ProductCard from "../components/ProductCard.vue"
import { inject, type Ref } from "vue"
const isDark = inject<Ref<boolean>>("isDark")!
const products = ref<Product[]>([])
const categories = ref<Category[]>([])
const search = ref("")
const selectedCategory = ref("")
const loading = ref(true)

onMounted(async () => {
  try {
    products.value = await getProducts()
    categories.value = await getCategories()
  } finally {
    loading.value = false
  }
})

const filteredProducts = computed(() =>
  products.value.filter((p) => {
    const matchesSearch = p.title
      .toLowerCase()
      .includes(search.value.toLowerCase())

    const matchesCategory =
      selectedCategory.value === "" || p.category === selectedCategory.value

    return matchesSearch && matchesCategory
  })
)
</script>

<template>
  <div class="p-4">
    <div class="flex flex-col md:flex-row gap-4 mb-4">
      <input
  v-model="search"
  placeholder="Search products..."
  :class="[
    'border p-2 w-full rounded',
    isDark ? 'bg-gray-800 text-white border-gray-600' : 'bg-white text-black'
  ]"
/>


      <select
  v-model="selectedCategory"
  :class="[
    'border p-2 rounded md:w-64',
    isDark ? 'bg-gray-800 text-white border-gray-600' : 'bg-white text-black'
  ]"
>
        <option value="">All Categories</option>
        <option
          v-for="category in categories"
          :key="category.slug"
          :value="category.slug"
        >
          {{ category.name }}
        </option>
      </select>
    </div>

    <div v-if="loading" class="text-center text-lg font-semibold text-blue-600 dark:text-blue-400 py-8">
      Loading products...
    </div>

    <div v-else-if="filteredProducts.length === 0" class="text-gray-500 dark:text-gray-300">
      No products found.
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <ProductCard
        v-for="product in filteredProducts"
        :key="product.id"
        :product="product"
      />
    </div>
  </div>
</template>