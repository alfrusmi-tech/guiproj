<script setup lang="ts">
import { computed, inject, type Ref } from "vue"
import type { Product } from "../types/product"
import { convertToLKR } from "../utils/currency"
import { useCartStore } from "../stores/cart"

const { product } = defineProps<{ product: Product }>()
const emit = defineEmits<{ (e: "open", product: Product): void }>()
const isDark = inject<Ref<boolean>>("isDark")!
const cartStore = useCartStore()

const soldCount = computed(() => Math.floor((product.id * 12345) % (product.stock + 1)))
const originalPrice = computed(() => product.price / (1 - product.discountPercentage / 100))

function addToCart(event: MouseEvent) {
  event.stopPropagation()
  cartStore.addToCart(product)
}
</script>

<template>
  <article
    :class="[
      'group overflow-hidden rounded-2xl border shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl',
      isDark ? 'border-gray-700 bg-gray-800 text-white' : 'border-gray-200 bg-white text-gray-900'
    ]"
    @click="emit('open', product)"
  >
    <div class="relative overflow-hidden bg-gray-100">
      <img :src="product.thumbnail" :alt="product.title" class="h-52 w-full object-cover transition duration-500 group-hover:scale-110" />
      <span class="absolute left-3 top-3 rounded-full bg-red-500 px-2.5 py-1 text-xs font-bold text-white">
        -{{ Math.round(product.discountPercentage) }}%
      </span>
      <span class="absolute right-3 top-3 rounded-full bg-white/90 px-2 py-1 text-sm text-amber-500 shadow">★ {{ product.rating }}</span>
    </div>

    <div class="p-4">
      <p class="mb-1 text-xs font-bold uppercase tracking-wide text-indigo-500">{{ product.category }}</p>
      <h2 class="line-clamp-2 min-h-12 text-base font-bold">{{ product.title }}</h2>
      <p :class="['mt-1 text-sm', isDark ? 'text-gray-400' : 'text-gray-500']">{{ product.brand || 'QuickBuy' }} · {{ soldCount }}+ sold</p>

      <div class="mt-4 flex items-end justify-between gap-3">
        <div>
          <p class="text-lg font-extrabold text-indigo-600 dark:text-indigo-400">{{ convertToLKR(product.price) }}</p>
          <p class="text-xs text-gray-400 line-through">{{ convertToLKR(originalPrice) }}</p>
        </div>
        <button
          type="button"
          class="rounded-xl bg-indigo-600 px-3 py-2 text-sm font-bold text-white transition hover:bg-indigo-700"
          @click="addToCart"
        >
          Add
        </button>
      </div>
    </div>
  </article>
</template>
