<template>
  <nav class="bg-blue-600 text-white p-4 shadow-lg">
    <div class="container mx-auto flex justify-between items-center">
      <!-- Store Name -->
      <h1 class="text-xl font-bold hover:text-gray-200 cursor-pointer">
        SmartBuy Mart
      </h1>

      <!-- Desktop Navigation -->
      <div class="hidden md:flex items-center space-x-6">
        <router-link to="/" class="hover:text-gray-200 transition duration-300">
          Home
        </router-link>

        <router-link to="/dashboard" class="hover:text-gray-200 transition duration-300">
          Dashboard
        </router-link>

        <!-- Search Bar -->
        <div class="relative">
          <input
            v-model="searchModel"
            type="text"
            placeholder="Search products..."
            class="px-3 py-1 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-white"
          />
          <button class="absolute right-2 top-1 text-gray-600 hover:text-black" aria-label="Search">
            🔍
          </button>
        </div>

        <!-- Shopping Cart -->
        <router-link to="/cart" class="hover:text-gray-200 transition duration-300 flex items-center">
          <span class="mr-1">🛒</span>
          Cart
        </router-link>
      </div>

      <!-- Mobile Menu Button -->
      <button
        @click="toggleMenu"
        class="md:hidden focus:outline-none"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path v-if="!isOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>

    <!-- Mobile Navigation -->
    <div v-if="isOpen" class="md:hidden mt-4 border-t border-blue-500 pt-4">
      <div class="flex flex-col space-y-2">
        <router-link to="/" @click="closeMenu" class="hover:text-gray-200 transition duration-300 py-2">
          Home
        </router-link>

        <router-link to="/dashboard" @click="closeMenu" class="hover:text-gray-200 transition duration-300 py-2">
          Dashboard
        </router-link>

        <!-- Mobile Search Bar -->
        <div class="relative mt-2">
          <input
            v-model="searchModel"
            type="text"
            placeholder="Search products..."
            class="w-full px-3 py-2 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-white"
          />
          <button class="absolute right-2 top-2 text-gray-600 hover:text-black" aria-label="Search">
            🔍
          </button>
        </div>

        <!-- Mobile Shopping Cart -->
        <router-link to="/cart" @click="closeMenu" class="hover:text-gray-200 transition duration-300 py-2 flex items-center">
          <span class="mr-1">🛒</span>
          Cart
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, computed } from "vue"

const props = defineProps<{ search?: string }>()
const emit = defineEmits<{ (e: "update:search", value: string): void }>()
const searchModel = computed({
  get: () => props.search ?? "",
  set: (value: string) => emit("update:search", value),
})

const isOpen = ref(false)

function toggleMenu() {
  isOpen.value = !isOpen.value
}

function closeMenu() {
  isOpen.value = false
}
</script>

<style scoped>
nav {
  font-family: 'Arial', sans-serif;
}

.router-link-active {
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 0.375rem;
  padding: 0.25rem 0.5rem;
}
</style>