<script setup lang="ts">
import type { Product } from "../types/product"
import { useCartStore } from "../stores/cart"
import { inject, type Ref } from "vue"

const isDark = inject<Ref<boolean>>("isDark")!
const cartStore = useCartStore()

const props = defineProps<{
  product: Product | null
  show: boolean
}>()

const emit = defineEmits<{
  (e: "close"): void
}>()

function addToCart() {
  if (props.product) {
    cartStore.addToCart(props.product)
  }
}
</script>

<template>
  <transition name="fade">
    <div
      v-if="show && product"
      class="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4"
      @click.self="emit('close')"
    >
      <transition name="scale">
        <div
          v-if="show && product"
          :class="[
            'w-full max-w-2xl rounded-xl shadow-2xl p-6 relative',
            isDark ? 'bg-gray-900 text-white' : 'bg-white text-black'
          ]"
        >
          <button
            @click="emit('close')"
            class="absolute top-3 right-3 text-2xl font-bold hover:text-red-500"
          >
            ×
          </button>

          <div class="grid md:grid-cols-2 gap-6 items-start">
            <img
              :src="product.thumbnail"
              :alt="product.title"
              class="w-full h-72 object-cover rounded-lg"
            />

            <div>
              <h2 class="text-2xl font-bold mb-3">
                {{ product.title }}
              </h2>

              <p :class="isDark ? 'text-gray-300 mb-4' : 'text-gray-700 mb-4'">
                {{ product.description }}
              </p>

              <p class="text-blue-500 text-xl font-semibold mb-2">
                ${{ product.price }}
              </p>

              <p class="mb-2">
                <span class="font-semibold">Category:</span>
                {{ product.category }}
              </p>

              <p class="mb-4">
                <span class="font-semibold">Brand:</span>
                {{ product.brand }}
              </p>

              <button
                @click="addToCart"
                class="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg transition"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.scale-enter-active,
.scale-leave-active {
  transition: all 0.25s ease;
}

.scale-enter-from,
.scale-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>