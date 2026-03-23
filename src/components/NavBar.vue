<template>
  <nav
    :class="isDark ? 'bg-gray-900 text-white p-4 flex justify-between items-center' : 'bg-blue-600 text-white p-4 flex justify-between items-center'"
  >
    <h1 class="text-xl font-bold">My SPA Store</h1>

    <div class="flex gap-3 items-center">
      <button
        @click="toggleDarkMode"
        :class="isDark
          ? 'bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600'
          : 'bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100'"
      >
        {{ isDark ? "Light Mode" : "Dark Mode" }}
      </button>

      <router-link
        to="/"
        :class="isDark
          ? 'bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600'
          : 'bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100'"
      >
        Home
      </router-link>

      <router-link
        to="/dashboard"
        :class="isDark
          ? 'bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600'
          : 'bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100'"
      >
        Dashboard
      </router-link>

      <router-link
         to="/cart"
        :class="isDark
           ? 'bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600'
           : 'bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100'"
      >
     Cart ({{ cartStore.totalItems }})
     </router-link>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { inject, type Ref } from "vue"
import { useCartStore } from '../stores/cart'

const isDark = inject<Ref<boolean>>("isDark")!
const toggleDarkMode = inject<() => void>("toggleDarkMode")!
const cartStore = useCartStore()
</script>