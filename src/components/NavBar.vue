<script setup lang="ts">
import { inject, type Ref, computed } from "vue"
import { useAuthStore } from "../stores/auth"

const toggleDarkMode = inject<() => void>("toggleDarkMode")!
const isDark = inject<Ref<boolean>>("isDark")!
const authStore = useAuthStore()

const isLoggedIn = computed(() => !!authStore.token)
</script>

<template>
  <nav class="bg-indigo-600 text-white px-6 py-3 flex justify-between items-center">
    <div class="flex items-center gap-2">
      <img src="/logo 1.png" alt="QuickBuy Logo" class="h-9 w-auto" />
      <h1 class="text-xl font-bold">QuickBuy</h1>
    </div>

    <div class="flex items-center gap-3">
      <button
        @click="toggleDarkMode()"
        class="border border-white text-white px-5 py-1.5 rounded text-sm hover:bg-indigo-500 transition"
      >
        {{ isDark ? 'Light mode' : 'Dark mode' }}
      </button>
      <router-link to="/" class="border border-white text-white px-5 py-1.5 rounded text-sm hover:bg-indigo-500 transition">
        Home
      </router-link>
      <router-link to="/cart" class="border border-white text-white px-5 py-1.5 rounded text-sm hover:bg-indigo-500 transition">
        Cart
      </router-link>

      <!-- Logged in: show user name + logout -->
      <template v-if="isLoggedIn">
        <span class="text-sm font-medium px-2">👋 {{ authStore.user.firstName }}</span>
        <button
          @click="authStore.logout()"
          class="border border-white text-white px-5 py-1.5 rounded text-sm hover:bg-red-500 transition"
        >
          Logout
        </button>
      </template>

      <!-- Not logged in: show login link -->
      <router-link v-else to="/login" class="border border-white text-white px-5 py-1.5 rounded text-sm hover:bg-indigo-500 transition">
        Login
      </router-link>
    </div>
  </nav>
</template>