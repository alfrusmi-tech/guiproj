<script setup lang="ts">
import { computed, inject, onMounted, ref, type Ref } from "vue"
import { getCategories, getProducts, type Category } from "../services/api"
import type { Product } from "../types/product"
import ProductCard from "../components/ProductCard.vue"
import ProductModal from "../components/ProductModal.vue"

const isDark = inject<Ref<boolean>>("isDark")!

const products = ref<Product[]>([])
const categories = ref<Category[]>([])

const search = ref("")
const selectedCategory = ref("")
const sortBy = ref("featured")

const loading = ref(true)
const error = ref("")

const selectedProduct = ref<Product | null>(null)
const showModal = ref(false)

const featureItems = [
  {
    icon: "🚚",
    title: "Fast Delivery",
    text: "Island-wide delivery",
  },
  {
    icon: "🔒",
    title: "Secure Payment",
    text: "Safe checkout process",
  },
  {
    icon: "↩",
    title: "Easy Returns",
    text: "Simple return support",
  },
  {
    icon: "💬",
    title: "Customer Support",
    text: "Help when you need it",
  },
]

async function loadData() {
  loading.value = true
  error.value = ""

  try {
    const [productData, categoryData] = await Promise.all([
      getProducts(),
      getCategories(),
    ])

    products.value = productData
    categories.value = categoryData
  } catch (err) {
    console.error("Unable to load products:", err)

    error.value =
      "Unable to load products. Please check your internet connection and try again."
  } finally {
    loading.value = false
  }
}

onMounted(loadData)

const filteredProducts = computed(() => {
  const term = search.value.trim().toLowerCase()

  const result = products.value.filter((product) => {
    const searchableText = [
      product.title,
      product.brand,
      product.category,
      product.description,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase()

    const matchesSearch =
      term.length === 0 || searchableText.includes(term)

    const matchesCategory =
      selectedCategory.value.length === 0 ||
      product.category === selectedCategory.value

    return matchesSearch && matchesCategory
  })

  return [...result].sort((a, b) => {
    if (sortBy.value === "price-low") {
      return a.price - b.price
    }

    if (sortBy.value === "price-high") {
      return b.price - a.price
    }

    if (sortBy.value === "rating") {
      return b.rating - a.rating
    }

    if (sortBy.value === "discount") {
      return b.discountPercentage - a.discountPercentage
    }

    return a.id - b.id
  })
})

const featuredProducts = computed(() => {
  return [...products.value]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4)
})

function scrollToProducts() {
  document.getElementById("products")?.scrollIntoView({
    behavior: "smooth",
  })
}

function chooseCategory(category: string) {
  selectedCategory.value = category
  scrollToProducts()
}

function resetFilters() {
  search.value = ""
  selectedCategory.value = ""
  sortBy.value = "featured"
}

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
  <main
    :class="[
      'min-h-screen transition-colors duration-300',
      isDark ? 'bg-gray-950 text-white' : 'bg-gray-50 text-gray-900',
    ]"
  >
    <!-- Hero section -->
    <section
      class="overflow-hidden bg-gradient-to-br from-[#C0BDE8] via-[#B5B0E3] to-[#A8A2DD] text-white"
    >
      <div
        class="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 lg:px-8 lg:py-24"
      >
        <div>
          <span
            class="inline-flex rounded-full bg-white/15 px-4 py-2 text-sm font-semibold ring-1 ring-white/25"
          >
            New season offers are live
          </span>

          <h1
            class="mt-6 text-4xl font-black leading-tight sm:text-5xl lg:text-6xl"
          >
            Shop smarter.
            <br />
            Live better.
          </h1>

          <p
            class="mt-5 max-w-xl text-base leading-7 text-white/90 sm:text-lg"
          >
            Discover quality beauty, technology, home, and lifestyle
            products at affordable prices—all in one simple store.
          </p>

          <div class="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              class="rounded-xl bg-white px-6 py-3 font-bold text-[#6F68BE] shadow-lg transition duration-200 hover:-translate-y-0.5 hover:bg-gray-100"
              @click="scrollToProducts"
            >
              Shop Now
            </button>

            <button
              type="button"
              class="rounded-xl border border-white/60 px-6 py-3 font-bold text-white transition duration-200 hover:bg-white/10"
              @click="chooseCategory('smartphones')"
            >
              Explore Phones
            </button>
          </div>
        </div>

        <div class="relative mx-auto w-full max-w-lg">
          <div
            class="absolute -inset-6 rounded-full bg-white/10 blur-3xl"
          ></div>

          <div
            class="relative rounded-3xl border border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur"
          >
            <img
              src="/logo 2.png"
              alt="QuickBuy shopping"
              class="mx-auto h-56 w-auto object-contain sm:h-72"
            />

            <div class="mt-5 grid grid-cols-3 gap-3 text-center">
              <div class="rounded-xl bg-white/10 p-3">
                <strong class="block text-xl">30+</strong>
                <span class="text-xs text-white/80">Products</span>
              </div>

              <div class="rounded-xl bg-white/10 p-3">
                <strong class="block text-xl">20+</strong>
                <span class="text-xs text-white/80">Categories</span>
              </div>

              <div class="rounded-xl bg-white/10 p-3">
                <strong class="block text-xl">4.5★</strong>
                <span class="text-xs text-white/80">Top rated</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Service features -->
    <section class="mx-auto -mt-7 max-w-7xl px-4 sm:px-6 lg:px-8">
      <div
        :class="[
          'grid gap-4 rounded-2xl border p-5 shadow-lg sm:grid-cols-2 lg:grid-cols-4',
          isDark
            ? 'border-gray-700 bg-gray-900'
            : 'border-gray-200 bg-white',
        ]"
      >
        <div
          v-for="item in featureItems"
          :key="item.title"
          class="flex items-center gap-3 rounded-xl p-2"
        >
          <span class="text-3xl">
            {{ item.icon }}
          </span>

          <div>
            <h3 class="font-bold">
              {{ item.title }}
            </h3>

            <p
              :class="[
                'text-sm',
                isDark ? 'text-gray-400' : 'text-gray-500',
              ]"
            >
              {{ item.text }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured products -->
    <section
      v-if="!loading && !error"
      class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
    >
      <div class="mb-7 flex items-end justify-between gap-4">
        <div>
          <p class="font-bold uppercase tracking-widest text-[#766FC5]">
            Popular now
          </p>

          <h2 class="mt-2 text-3xl font-black">
            Featured Products
          </h2>
        </div>

        <button
          type="button"
          class="font-bold text-[#766FC5] transition hover:text-[#5F58AF] hover:underline"
          @click="scrollToProducts"
        >
          View all →
        </button>
      </div>

      <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <ProductCard
          v-for="product in featuredProducts"
          :key="`featured-${product.id}`"
          :product="product"
          @open="openModal"
        />
      </div>
    </section>

    <!-- All products -->
    <section
      id="products"
      class="mx-auto max-w-7xl scroll-mt-24 px-4 py-16 sm:px-6 lg:px-8"
    >
      <div class="mb-8 text-center">
        <p class="font-bold uppercase tracking-widest text-[#766FC5]">
          Browse our store
        </p>

        <h2 class="mt-2 text-3xl font-black sm:text-4xl">
          All Products
        </h2>

        <p
          :class="[
            'mx-auto mt-3 max-w-2xl',
            isDark ? 'text-gray-400' : 'text-gray-500',
          ]"
        >
          Search by product, brand, category, or description.
        </p>
      </div>

      <!-- Search and filter box -->
      <div
        :class="[
          'mb-8 grid gap-4 rounded-2xl border p-4 shadow-sm md:grid-cols-[1fr_220px_200px]',
          isDark
            ? 'border-gray-700 bg-gray-900'
            : 'border-gray-200 bg-white',
        ]"
      >
        <!-- Search input -->
        <input
          v-model="search"
          type="search"
          placeholder="Search products, brands or categories..."
          :class="[
            'w-full rounded-xl border px-4 py-3 outline-none transition',
            'focus:border-[#8C85CF] focus:ring-2 focus:ring-[#C0BDE8]',
            isDark
              ? 'border-gray-700 bg-gray-800 text-white placeholder:text-gray-400'
              : 'border-gray-300 bg-white text-gray-900 placeholder:text-gray-400',
          ]"
        />

        <!-- Category select -->
        <select
          v-model="selectedCategory"
          :class="[
            'w-full cursor-pointer rounded-xl border px-4 py-3 outline-none transition',
            'focus:border-[#8C85CF] focus:ring-2 focus:ring-[#C0BDE8]',
            isDark
              ? 'border-gray-700 bg-gray-800 text-white [color-scheme:dark]'
              : 'border-gray-300 bg-white text-gray-900 [color-scheme:light]',
          ]"
        >
          <option
            value=""
            :class="
              isDark
                ? 'bg-gray-800 text-white'
                : 'bg-white text-gray-900'
            "
          >
            All Categories
          </option>

          <option
            v-for="category in categories"
            :key="category.slug"
            :value="category.slug"
            :class="
              isDark
                ? 'bg-gray-800 text-white'
                : 'bg-white text-gray-900'
            "
          >
            {{ category.name }}
          </option>
        </select>

        <!-- Sorting select -->
        <select
          v-model="sortBy"
          :class="[
            'w-full cursor-pointer rounded-xl border px-4 py-3 outline-none transition',
            'focus:border-[#8C85CF] focus:ring-2 focus:ring-[#C0BDE8]',
            isDark
              ? 'border-gray-700 bg-gray-800 text-white [color-scheme:dark]'
              : 'border-gray-300 bg-white text-gray-900 [color-scheme:light]',
          ]"
        >
          <option
            value="featured"
            :class="
              isDark
                ? 'bg-gray-800 text-white'
                : 'bg-white text-gray-900'
            "
          >
            Featured
          </option>

          <option
            value="price-low"
            :class="
              isDark
                ? 'bg-gray-800 text-white'
                : 'bg-white text-gray-900'
            "
          >
            Price: Low to High
          </option>

          <option
            value="price-high"
            :class="
              isDark
                ? 'bg-gray-800 text-white'
                : 'bg-white text-gray-900'
            "
          >
            Price: High to Low
          </option>

          <option
            value="rating"
            :class="
              isDark
                ? 'bg-gray-800 text-white'
                : 'bg-white text-gray-900'
            "
          >
            Highest Rating
          </option>

          <option
            value="discount"
            :class="
              isDark
                ? 'bg-gray-800 text-white'
                : 'bg-white text-gray-900'
            "
          >
            Biggest Discount
          </option>
        </select>
      </div>

      <!-- Loading state -->
      <div
        v-if="loading"
        class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
      >
        <div
          v-for="n in 8"
          :key="n"
          :class="[
            'animate-pulse overflow-hidden rounded-2xl shadow',
            isDark ? 'bg-gray-800' : 'bg-white',
          ]"
        >
          <div
            :class="[
              'h-52',
              isDark ? 'bg-gray-700' : 'bg-gray-200',
            ]"
          ></div>

          <div class="space-y-3 p-4">
            <div
              :class="[
                'h-4 rounded',
                isDark ? 'bg-gray-700' : 'bg-gray-200',
              ]"
            ></div>

            <div
              :class="[
                'h-4 w-2/3 rounded',
                isDark ? 'bg-gray-700' : 'bg-gray-200',
              ]"
            ></div>

            <div
              :class="[
                'h-9 rounded',
                isDark ? 'bg-gray-700' : 'bg-gray-200',
              ]"
            ></div>
          </div>
        </div>
      </div>

      <!-- Error message -->
      <div
        v-else-if="error"
        :class="[
          'rounded-2xl border p-8 text-center',
          isDark
            ? 'border-red-900 bg-red-950/30'
            : 'border-red-200 bg-red-50',
        ]"
      >
        <p class="font-semibold text-red-600">
          {{ error }}
        </p>

        <button
          type="button"
          class="mt-4 rounded-xl bg-[#766FC5] px-5 py-2.5 font-bold text-white transition hover:bg-[#625BB3]"
          @click="loadData"
        >
          Try Again
        </button>
      </div>

      <!-- No products -->
      <div
        v-else-if="filteredProducts.length === 0"
        :class="[
          'rounded-2xl border border-dashed p-12 text-center',
          isDark ? 'border-gray-700' : 'border-gray-300',
        ]"
      >
        <div class="text-5xl">
          🔍
        </div>

        <h3 class="mt-4 text-xl font-bold">
          No products found
        </h3>

        <p
          :class="[
            'mt-2',
            isDark ? 'text-gray-400' : 'text-gray-500',
          ]"
        >
          Try another search or reset your filters.
        </p>

        <button
          type="button"
          class="mt-5 rounded-xl bg-[#766FC5] px-5 py-2.5 font-bold text-white transition hover:bg-[#625BB3]"
          @click="resetFilters"
        >
          Reset Filters
        </button>
      </div>

      <!-- Product grid -->
      <div v-else>
        <p
          :class="[
            'mb-5 text-sm',
            isDark ? 'text-gray-400' : 'text-gray-500',
          ]"
        >
          Showing {{ filteredProducts.length }} products
        </p>

        <div
          class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          <ProductCard
            v-for="product in filteredProducts"
            :key="product.id"
            :product="product"
            @open="openModal"
          />
        </div>
      </div>
    </section>

    <!-- Bottom call-to-action -->
    <section
      class="overflow-hidden bg-gradient-to-br from-[#C0BDE8] via-[#B5B0E3] to-[#A8A2DD] text-white"
    >
      <div class="mx-auto max-w-7xl px-6 py-20 text-center">
        <h2
          class="text-4xl font-extrabold leading-tight md:text-5xl"
        >
          Ready to find your next favourite product?
        </h2>

        <p class="mx-auto mt-6 max-w-2xl text-lg text-white/90">
          Browse the full collection and add products to your cart in
          just a few clicks.
        </p>

        <button
          type="button"
          class="mt-8 rounded-xl bg-white px-8 py-4 text-lg font-bold text-[#6F68BE] shadow-lg transition duration-200 hover:scale-105 hover:bg-gray-100"
          @click="scrollToProducts"
        >
          Start Shopping
        </button>
      </div>
    </section>

    <!-- Product modal -->
    <ProductModal
      :show="showModal"
      :product="selectedProduct"
      @close="closeModal"
    />
  </main>
</template>