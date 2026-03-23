import { defineStore } from 'pinia'
import type { Product } from '../types/product'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as Product[],
  }),
  getters: {
    totalItems: (state) => state.items.length,
    totalPrice: (state) => state.items.reduce((sum, p) => sum + p.price, 0),
  },
  actions: {
    addToCart(product: Product) {
      this.items.push(product)
    },
    removeFromCart(productId: number) {
      this.items = this.items.filter(p => p.id !== productId)
    },
    clearCart() {
      this.items = []
    }
  },
})