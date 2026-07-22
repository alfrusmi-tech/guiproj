<script setup lang="ts">
import { computed, inject, ref, type Ref } from "vue"
import { useAuthStore } from "../stores/auth"
import { useCartStore } from "../stores/cart"

const toggleDarkMode = inject<() => void>("toggleDarkMode")!
const isDark = inject<Ref<boolean>>("isDark")!
const authStore = useAuthStore()
const cartStore = useCartStore()
const mobileOpen = ref(false)

const isLoggedIn = computed(() => authStore.isLoggedIn)

function closeMenu() {
  mobileOpen.value = false
}
</script>

<template>
  <header class="sticky top-0 z-40 border-b border-[#A8A2DD] bg-[#A8A2DD] text-white shadow-lg">
    <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
      <router-link to="/" class="flex items-center gap-2" @click="closeMenu">
        <img src="/logo 1.png" alt="QuickBuy logo" class="h-10 w-auto" />
        <span class="text-xl font-extrabold tracking-tight">QuickBuy</span>
      </router-link>

      <nav class="hidden items-center gap-2 md:flex">
        <router-link to="/" class="nav-link">Home</router-link>
        <a href="/#products" class="nav-link">Products</a>

        <button type="button" class="nav-link" @click="toggleDarkMode">
          {{ isDark ? "☀ Light" : "☾ Dark" }}
        </button>

        <router-link to="/cart" class="relative nav-link">
          Cart
          <span
            v-if="cartStore.totalItems > 0"
            class="absolute -right-2 -top-2 min-w-5 rounded-full bg-amber-400 px-1.5 text-center text-xs font-bold text-gray-900"
          >
            {{ cartStore.totalItems }}
          </span>
        </router-link>

        <template v-if="isLoggedIn">
          <span class="px-3 text-sm font-semibold">Hi, {{ authStore.user.firstName }}</span>
          <button type="button" class="nav-link hover:bg-red-500" @click="authStore.logout()">Logout</button>
        </template>
        <router-link v-else to="/login" class="rounded-lg bg-white px-4 py-2 text-sm font-bold text-indigo-700 transition hover:bg-indigo-50">
          Login
        </router-link>
      </nav>

      <button
        type="button"
        class="rounded-lg border border-white/50 p-2 md:hidden"
        aria-label="Open navigation menu"
        @click="mobileOpen = !mobileOpen"
      >
        <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path v-if="!mobileOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <nav v-if="mobileOpen" class="space-y-2 border-t border-white/20 px-4 py-4 md:hidden">
      <router-link to="/" class="mobile-link" @click="closeMenu">Home</router-link>
      <a href="/#products" class="mobile-link" @click="closeMenu">Products</a>
      <router-link to="/cart" class="mobile-link" @click="closeMenu">Cart ({{ cartStore.totalItems }})</router-link>
      <button type="button" class="mobile-link w-full text-left" @click="toggleDarkMode">{{ isDark ? "Light mode" : "Dark mode" }}</button>
      <button v-if="isLoggedIn" type="button" class="mobile-link w-full text-left" @click="authStore.logout(); closeMenu()">Logout</button>
      <router-link v-else to="/login" class="mobile-link" @click="closeMenu">Login</router-link>
    </nav>
  </header>
</template>

<style scoped>
.nav-link {
  border-radius: 0.5rem;
  padding: 0.5rem 0.85rem;
  font-size: 0.875rem;
  font-weight: 600;
  transition: background-color 0.2s ease;
}
.nav-link:hover { background: rgb(99 102 241); }
.mobile-link {
  display: block;
  border-radius: 0.5rem;
  padding: 0.65rem 0.8rem;
  font-weight: 600;
}
.mobile-link:hover { background: rgb(99 102 241); }
</style>
