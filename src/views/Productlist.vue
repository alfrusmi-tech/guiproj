<script setup lang="ts">
import { ref, onMounted, computed, watch } from "vue"
import { getProducts } from "../services/api"
import type { Product } from "../types/product"
import ProductCard from "../components/ProductCard.vue"
import ProductModal from "../components/ProductModal.vue"

// Reactive state
const products = ref<Product[]>([])
const selectedProduct = ref<Product | null>(null)
const isModalOpen = ref(false)
const searchQuery = ref("")
const isLoading = ref(true)

// Computed properties for filtering and search
const filteredProducts = computed(() => {
  const query = searchQuery.value.toLowerCase().trim()

  if (!query) return products.value

  return products.value.filter((product) =>
    matchesSearch(product, query)
  )
})

const searchResultsCount = computed(() => filteredProducts.value.length)

const hasSearchResults = computed(() => searchResultsCount.value > 0)

const noResultsMessage = computed(() => {
  if (!searchQuery.value.trim()) return ""
  return hasSearchResults.value
    ? ""
    : `No products found for "${searchQuery.value}"`
})

// Search logic with multiple criteria
function matchesSearch(product: Product, query: string): boolean {
  const searchFields = [
    product.title,
    product.description,
    product.category,
    product.price.toString()
  ]

  return searchFields.some(field =>
    field.toLowerCase().includes(query)
  )
}

// Debounced search (optional performance optimization)
let searchTimeout: number | null = null
const debouncedSearch = (query: string) => {
  if (searchTimeout) clearTimeout(searchTimeout)

  searchTimeout = setTimeout(() => {
    searchQuery.value = query
  }, 300) // 300ms debounce
}

// Event handlers
function handleSearchInput(event: Event) {
  const target = event.target as HTMLInputElement
  debouncedSearch(target.value)
}

function clearSearch() {
  searchQuery.value = ""
  const input = document.querySelector('input[type="search"]') as HTMLInputElement
  if (input) input.value = ""
}

function handleProductSelected(product: Product) {
  selectedProduct.value = product
  isModalOpen.value = true
}

function closeModal() {
  isModalOpen.value = false
  selectedProduct.value = null
}

// Lifecycle
onMounted(async () => {
  try {
    products.value = await getProducts()
  } catch (error) {
    console.error("Failed to load products:", error)
  } finally {
    isLoading.value = false
  }
})

// Cleanup timeout on unmount
import { onUnmounted } from "vue"
onUnmounted(() => {
  if (searchTimeout) clearTimeout(searchTimeout)
})

// Dynamic grid classes based on product count
function getGridClasses(): string {
  const count = filteredProducts.value.length

  if (count === 0) return ""
  if (count === 1) return "grid-cols-1 max-w-md mx-auto"
  if (count === 2) return "grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto"
  if (count <= 4) return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
  if (count <= 6) return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
  return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6"
}
</script>

<template>
  <div class="p-4">
    <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <ProductCard
        v-for="product in filteredProducts"
        :key="product.id"
        :product="product"
        @product-selected="handleProductSelected"
      />
    </div>
    
    <!-- Modal -->
    <ProductModal
      :product="selectedProduct"
      :is-open="isModalOpen"
      @close="closeModal"
    />
  </div>
</template>