<script setup lang="ts">
import { useCartStore } from '../stores/cart'
import { convertToLKR } from '../utils/currency'
import { computed } from 'vue'
import { storeToRefs } from 'pinia'

const cartStore = useCartStore()
const { items, totalItems, totalPrice } = storeToRefs(cartStore)

const subtotal = computed(() => totalPrice.value)
const shipping = computed(() => subtotal.value > 10000 ? 0 : 4500)
const tax = computed(() => Math.round(subtotal.value * 0.08)) // 8% tax
const total = computed(() => subtotal.value + shipping.value + tax.value)

const freeShippingProgress = computed(() => {
  const target = 10000
  return Math.min((subtotal.value / target) * 100, 100)
})

const remainingForFreeShipping = computed(() => {
  const remaining = 10000 - subtotal.value
  return remaining > 0 ? remaining : 0
})

function updateQuantity(itemId: number, newQuantity: number) {
  if (newQuantity >= 1) {
    cartStore.updateQuantity(itemId, newQuantity)
  }
}

function removeItem(itemId: number) {
  cartStore.removeFromCart(itemId)
}

function proceedToCheckout() {
  // TODO: Implement checkout logic
  alert('Checkout functionality would be implemented here')
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Shopping Cart</h1>
        <p class="mt-2 text-gray-600 dark:text-gray-400">
          {{ totalItems }} {{ totalItems === 1 ? 'item' : 'items' }} in your cart
        </p>
      </div>

      <!-- Empty Cart State -->
      <div v-if="items.length === 0" class="text-center py-16">
        <div class="mx-auto w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
          <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
          </svg>
        </div>
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Your cart is empty</h2>
        <p class="text-gray-600 dark:text-gray-400 mb-8">Add some products to get started</p>
        <router-link
          to="/products"
          class="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
        >
          Continue Shopping
        </router-link>
      </div>

      <!-- Cart Content -->
      <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">

        <!-- Cart Items -->
        <div class="lg:col-span-2 space-y-4">
          <div
            v-for="item in items"
            :key="item.id"
            class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-shadow hover:shadow-md"
          >
            <div class="flex gap-6">
              <!-- Product Image -->
              <div class="flex-shrink-0">
                <img
                  :src="item.thumbnail"
                  :alt="item.title"
                  class="w-24 h-24 object-cover rounded-lg border border-gray-200 dark:border-gray-600"
                />
              </div>

              <!-- Product Details -->
              <div class="flex-1 min-w-0">
                <div class="flex justify-between items-start">
                  <div class="flex-1">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                      {{ item.title }}
                    </h3>
                    <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Brand: {{ item.brand }}
                    </p>
                    <p class="text-sm text-gray-600 dark:text-gray-400">
                      Category: {{ item.category }}
                    </p>
                  </div>

                  <!-- Remove Button -->
                  <button
                    @click="removeItem(item.id)"
                    class="text-gray-400 hover:text-red-500 transition-colors p-1"
                    title="Remove item"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                  </button>
                </div>

                <!-- Price and Quantity -->
                <div class="flex justify-between items-center mt-4">
                  <div class="text-lg font-semibold text-blue-600 dark:text-blue-400">
                    {{ convertToLKR(item.price) }}
                  </div>

                  <!-- Quantity Controls -->
                  <div class="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
                    <button
                      @click="updateQuantity(item.id, item.quantity - 1)"
                      class="px-3 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      :disabled="item.quantity <= 1"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
                      </svg>
                    </button>

                    <span class="px-4 py-2 text-gray-900 dark:text-white font-medium min-w-[3rem] text-center">
                      {{ item.quantity }}
                    </span>

                    <button
                      @click="updateQuantity(item.id, item.quantity + 1)"
                      class="px-3 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                      </svg>
                    </button>
                  </div>
                </div>

                <!-- Item Total -->
                <div class="mt-2 text-right">
                  <span class="text-sm text-gray-600 dark:text-gray-400">Total: </span>
                  <span class="font-semibold text-gray-900 dark:text-white">
                    {{ convertToLKR(item.price * item.quantity) }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Order Summary -->
        <div class="lg:col-span-1">
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 sticky top-6">

            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-6">Order Summary</h2>

            <!-- Subtotal -->
            <div class="flex justify-between items-center mb-4">
              <span class="text-gray-600 dark:text-gray-400">Subtotal ({{ totalItems }} items)</span>
              <span class="font-medium text-gray-900 dark:text-white">{{ convertToLKR(subtotal) }}</span>
            </div>

            <!-- Shipping -->
            <div class="flex justify-between items-center mb-4">
              <span class="text-gray-600 dark:text-gray-400">Shipping</span>
              <span class="font-medium text-gray-900 dark:text-white">
                {{ shipping === 0 ? 'FREE' : convertToLKR(shipping) }}
              </span>
            </div>

            <!-- Tax -->
            <div class="flex justify-between items-center mb-6">
              <span class="text-gray-600 dark:text-gray-400">Tax</span>
              <span class="font-medium text-gray-900 dark:text-white">{{ convertToLKR(tax) }}</span>
            </div>

            <!-- Free Shipping Progress -->
            <div v-if="remainingForFreeShipping > 0" class="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm font-medium text-blue-800 dark:text-blue-200">Free Shipping Progress</span>
                <span class="text-sm text-blue-600 dark:text-blue-300">{{ freeShippingProgress.toFixed(0) }}%</span>
              </div>
              <div class="w-full bg-blue-200 dark:bg-blue-800 h-2 rounded-full mb-2">
                <div
                  class="bg-blue-600 dark:bg-blue-400 h-2 rounded-full transition-all duration-300"
                  :style="{ width: freeShippingProgress + '%' }"
                ></div>
              </div>
              <p class="text-xs text-blue-700 dark:text-blue-300">
                Add {{ convertToLKR(remainingForFreeShipping) }} more for free shipping
              </p>
            </div>

            <hr class="border-gray-200 dark:border-gray-700 mb-6" />

            <!-- Total -->
            <div class="flex justify-between items-center mb-6">
              <span class="text-lg font-semibold text-gray-900 dark:text-white">Total</span>
              <span class="text-xl font-bold text-blue-600 dark:text-blue-400">{{ convertToLKR(total) }}</span>
            </div>

            <!-- Checkout Button -->
            <button
              @click="proceedToCheckout"
              class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 mb-4"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              Proceed to Checkout
            </button>

            <!-- Security Notice -->
            <div class="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
              </svg>
              Secure & encrypted checkout
            </div>

            <!-- Continue Shopping -->
            <router-link
              to="/products"
              class="block text-center mt-4 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
            >
              Continue Shopping →
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>