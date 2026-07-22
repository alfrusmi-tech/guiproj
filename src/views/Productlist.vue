<script setup lang="ts">
import { ref, onMounted, computed, inject, type Ref } from "vue"
import { getProducts, getCategories, type Category } from "../services/api"
import type { Product } from "../types/product"
import ProductCard from "../components/ProductCard.vue"
import ProductModal from "../components/ProductModal.vue"

const isDark = inject<Ref<boolean>>("isDark")!

const products = ref<Product[]>([])
const categories = ref<Category[]>([])
const search = ref("")
const selectedCategory = ref("")
const loading = ref(true)

const selectedProduct = ref<Product | null>(null)
const showModal = ref(false)

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

function openModal(product: Product) {
  selectedProduct.value = product
  showModal.value = true
}

function closeModal() {
  showModal.value = false
  setTimeout(() => {
    selectedProduct.value = null
  }, 250)
}
</script>

<template>
  <div class="p-4">

    <!-- Hero Section -->
    <div class="mb-6">
      <div
        :class="[
          'rounded-2xl py-12 text-center',
          isDark ? 'bg-indigo-900' : 'bg-indigo-200'
        ]"
      >
        <div class="flex justify-center mb-4">
          <img src="/ChatGPT Image Jul 22, 2026, 11_33_03 AM.png" alt="QuickBuy Logo" class="h-20 w-auto" />
        </div>
        <h1
          :class="[
            'text-3xl font-bold mb-3',
            isDark ? 'text-white' : 'text-black'
          ]"
        >
          Welcome to QuickBuy
        </h1>
        <p
          :class="[
            'text-sm max-w-lg mx-auto leading-relaxed',
            isDark ? 'text-gray-300' : 'text-gray-700'
          ]"
        >
          Premium quality meets affordability. Explore our handpicked selection of top-rated products
          across all categories and get them delivered straight to your door
        </p>
      </div>
    </div>

    <!-- Search & Category Filter -->
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

    <!-- Loading State -->
    <div v-if="loading" class="text-center text-lg font-semibold text-blue-600 py-8">
      Loading products...
    </div>

    <!-- No Results -->
    <div v-else-if="filteredProducts.length === 0" class="text-gray-500">
      No products found.
    </div>

    <!-- Product Grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <ProductCard
        v-for="product in filteredProducts"
        :key="product.id"
        :product="product"
        @open="openModal"
      />
    </div>

    <!-- Product Modal -->
    <ProductModal
      :show="showModal"
      :product="selectedProduct"
      @close="closeModal"
    />
  </div>
</template>