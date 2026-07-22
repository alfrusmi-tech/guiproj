<script setup lang="ts">
import { useCartStore } from '../stores/cart'
import { useAuthStore } from '../stores/auth'
import { convertToLKR } from '../utils/currency'
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

const cartStore = useCartStore()
const authStore = useAuthStore()
const router = useRouter()
const { items, totalItems, totalPrice } = storeToRefs(cartStore)

const subtotal = computed(() => totalPrice.value)
const shipping = computed(() => subtotal.value > 10000 ? 0 : 4500)
const tax = computed(() => Math.round(subtotal.value * 0.08))
const total = computed(() => subtotal.value + shipping.value + tax.value)

const freeShippingProgress = computed(() => Math.min((subtotal.value / 10000) * 100, 100))
const remainingForFreeShipping = computed(() => Math.max(10000 - subtotal.value, 0))

// Checkout state
const showCheckout = ref(false)
const orderPlaced = ref(false)
const checkoutForm = ref({ name: '', address: '', city: '', phone: '', paymentMethod: 'cod' })

function updateQuantity(itemId: number, newQuantity: number) {
  if (newQuantity >= 1) cartStore.updateQuantity(itemId, newQuantity)
}

function removeItem(itemId: number) {
  cartStore.removeFromCart(itemId)
}

function proceedToCheckout() {
  if (!authStore.isLoggedIn) {
    router.push('/login')
    return
  }
  showCheckout.value = true
}

function placeOrder() {
  orderPlaced.value = true
  showCheckout.value = false
  cartStore.clearCart()
}

function continueShopping() {
  orderPlaced.value = false
  router.push('/')
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Shopping Cart</h1>
        <p class="mt-2 text-gray-600 dark:text-gray-400">
          {{ totalItems }} {{ totalItems === 1 ? 'item' : 'items' }} in your cart
        </p>
      </div>

      <!-- ✅ Order Success -->
      <div v-if="orderPlaced" class="text-center py-16">
        <div class="mx-auto w-24 h-24 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-6">
          <svg class="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Order Placed Successfully! 🎉</h2>
        <p class="text-gray-600 dark:text-gray-400 mb-8">Thank you for shopping with QuickBuy.</p>
        <button @click="continueShopping" class="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
          Continue Shopping
        </button>
      </div>

      <!-- 📝 Checkout Form -->
      <div v-else-if="showCheckout" class="max-w-2xl mx-auto">
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Checkout</h2>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
              <input v-model="checkoutForm.name" type="text" placeholder="Enter your full name"
                class="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Delivery Address</label>
              <textarea v-model="checkoutForm.address" placeholder="Enter your delivery address" rows="3"
                class="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"></textarea>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">City</label>
                <input v-model="checkoutForm.city" type="text" placeholder="City"
                  class="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone</label>
                <input v-model="checkoutForm.phone" type="tel" placeholder="Phone number"
                  class="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Payment Method</label>
              <select v-model="checkoutForm.paymentMethod"
                class="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                <option value="cod">Cash on Delivery</option>
                <option value="card">Credit / Debit Card</option>
                <option value="bank">Bank Transfer</option>
              </select>
            </div>

            <div class="border-t border-gray-200 dark:border-gray-600 pt-4 mt-6">
              <div class="flex justify-between items-center text-lg font-semibold text-gray-900 dark:text-white">
                <span>Total to pay:</span>
                <span class="text-blue-600 dark:text-blue-400">{{ convertToLKR(total) }}</span>
              </div>
            </div>

            <div class="flex gap-4 pt-4">
              <button @click="showCheckout = false" class="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                ← Back to Cart
              </button>
              <button @click="placeOrder" class="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium transition-colors">
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 🛒 Empty Cart -->
      <div v-else-if="items.length === 0" class="text-center py-16">
        <div class="mx-auto w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
          <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
          </svg>
        </div>
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Your cart is empty</h2>
        <p class="text-gray-600 dark:text-gray-400 mb-8">Add some products to get started</p>
        <router-link to="/" class="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
          Continue Shopping
        </router-link>
      </div>

      <!-- 🛍️ Cart Items + Summary (same as your existing layout, just with fixed "Continue Shopping" link) -->
      <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2 space-y-4">
          <div v-for="item in items" :key="item.id" class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
            <div class="flex gap-6">
              <div class="flex-shrink-0">
                <img :src="item.thumbnail" :alt="item.title" class="w-24 h-24 object-cover rounded-lg border border-gray-200 dark:border-gray-600" />
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex justify-between items-start">
                  <div>
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-1">{{ item.title }}</h3>
                    <p class="text-sm text-gray-600 dark:text-gray-400">Brand: {{ item.brand }}</p>
                    <p class="text-sm text-gray-600 dark:text-gray-400">Category: {{ item.category }}</p>
                  </div>
                  <button @click="removeItem(item.id)" class="text-gray-400 hover:text-red-500 transition-colors p-1" title="Remove item">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                  </button>
                </div>
                <div class="flex justify-between items-center mt-4">
                  <div class="text-lg font-semibold text-blue-600 dark:text-blue-400">{{ convertToLKR(item.price) }}</div>
                  <div class="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
                    <button @click="updateQuantity(item.id, item.quantity - 1)" :disabled="item.quantity <= 1" class="px-3 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50">−</button>
                    <span class="px-4 py-2 text-gray-900 dark:text-white font-medium min-w-[3rem] text-center">{{ item.quantity }}</span>
                    <button @click="updateQuantity(item.id, item.quantity + 1)" class="px-3 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700">+</button>
                  </div>
                </div>
                <div class="mt-2 text-right">
                  <span class="text-sm text-gray-600 dark:text-gray-400">Total: </span>
                  <span class="font-semibold text-gray-900 dark:text-white">{{ convertToLKR(item.price * item.quantity) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Order Summary Sidebar -->
        <div class="lg:col-span-1">
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 sticky top-6">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-6">Order Summary</h2>
            <div class="flex justify-between mb-4"><span class="text-gray-600 dark:text-gray-400">Subtotal ({{ totalItems }} items)</span><span class="font-medium text-gray-900 dark:text-white">{{ convertToLKR(subtotal) }}</span></div>
            <div class="flex justify-between mb-4"><span class="text-gray-600 dark:text-gray-400">Shipping</span><span class="font-medium text-gray-900 dark:text-white">{{ shipping === 0 ? 'FREE' : convertToLKR(shipping) }}</span></div>
            <div class="flex justify-between mb-6"><span class="text-gray-600 dark:text-gray-400">Tax (8%)</span><span class="font-medium text-gray-900 dark:text-white">{{ convertToLKR(tax) }}</span></div>

            <div v-if="remainingForFreeShipping > 0" class="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <div class="flex justify-between mb-2"><span class="text-sm font-medium text-blue-800 dark:text-blue-200">Free Shipping Progress</span><span class="text-sm text-blue-600 dark:text-blue-300">{{ freeShippingProgress.toFixed(0) }}%</span></div>
              <div class="w-full bg-blue-200 dark:bg-blue-800 h-2 rounded-full mb-2">
                <div class="bg-blue-600 dark:bg-blue-400 h-2 rounded-full transition-all duration-300" :style="{ width: freeShippingProgress + '%' }"></div>
              </div>
              <p class="text-xs text-blue-700 dark:text-blue-300">Add {{ convertToLKR(remainingForFreeShipping) }} more for free shipping</p>
            </div>

            <hr class="border-gray-200 dark:border-gray-700 mb-6" />
            <div class="flex justify-between mb-6"><span class="text-lg font-semibold text-gray-900 dark:text-white">Total</span><span class="text-xl font-bold text-blue-600 dark:text-blue-400">{{ convertToLKR(total) }}</span></div>

            <button @click="proceedToCheckout" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors">
              Proceed to Checkout
            </button>
            <router-link to="/" class="block text-center text-sm text-blue-600 dark:text-blue-400 hover:underline mt-4">← Continue Shopping</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>