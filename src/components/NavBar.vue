<script setup lang="ts">
import { inject } from "vue"

const toggleDarkMode = inject<() => void>("toggleDarkMode")
const isDark = inject<boolean>("isDark", false)
</script>

<template>
  <nav class="bg-indigo-600 text-white px-6 py-3 flex justify-between items-center">
    <div class="flex items-center gap-2">
      
      <img src="C:\GUI_PROJECT\my-project\public\logo 1.png" alt="QuickBuy Logo" class="h-9 w-auto" />
      <h1 class="text-xl font-bold">QuickBuy</h1>
    </div>

    <div class="flex items-center gap-3">
      <button
        @click="toggleDarkMode?.()"
        class="border border-white text-white px-5 py-1.5 rounded text-sm hover:bg-indigo-500 transition"
      >
        {{ isDark ? 'Light mode' : 'Dark mode' }}
      </button>
      <router-link
        to="/"
        class="border border-white text-white px-5 py-1.5 rounded text-sm hover:bg-indigo-500 transition"
      >
        Home
      </router-link>
      <router-link
        to="/cart"
        class="border border-white text-white px-5 py-1.5 rounded text-sm hover:bg-indigo-500 transition"
      >
        Cart
      </router-link>
      <router-link
        to="/login"
        class="border border-white text-white px-5 py-1.5 rounded text-sm hover:bg-indigo-500 transition"
      >
        Login
      </router-link>
    </div>
  </nav>
</template>