<script setup lang="ts">
import { useCartStore } from '../stores/cart'
import { convertToLKR } from '../utils/currency'
import { computed } from 'vue'

const cartStore = useCartStore()

const totalPriceLKR = computed(() => {
  const totalUSD = cartStore.totalPrice
  return convertToLKR(totalUSD)
})
</script>

<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Shopping Cart</h1>

    <div v-if="cartStore.items.length === 0" class="text-gray-500 dark:text-gray-300">
      Your cart is empty.
    </div>

    <div v-else class="space-y-4">
      <div
        v-for="item in cartStore.items"
        :key="item.id"
        class="flex justify-between items-center border p-4 rounded bg-white dark:bg-gray-800 dark:text-white"
      >
        <div>
          <h2 class="font-bold">{{ item.title }}</h2>
          <p class="text-blue-500 dark:text-blue-400 font-semibold">{{ convertToLKR(item.price) }}</p>
        </div>

        <button
          @click="cartStore.removeFromCart(item.id)"
          class="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
        >
          Remove
        </button>
      </div>

      <div class="text-right font-bold text-lg mt-2">
        Total: {{ totalPriceLKR }}
      </div>

      <button
        @click="cartStore.clearCart()"
        class="mt-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
      >
        Clear Cart
      </button>
    </div>
  </div>
</template>