<template>
  <nav
    :class="isDark ? 'bg-gray-900 text-white p-4 flex justify-between items-center' : 'bg-blue-600 text-white p-4 flex justify-between items-center'"
  >
    <h1 class="text-xl font-bold">QuickBuy</h1>

    <div class="flex gap-3 items-center">

      <!-- Dark Mode -->
      <button
        @click="toggleDarkMode"
        :class="isDark
          ? 'bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600'
          : 'bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100'"
      >
        {{ isDark ? "Light Mode" : "Dark Mode" }}
      </button>

      <!-- Home -->
      <router-link
        to="/"
        :class="btnClass"
      >
        Home
      </router-link>

      <!-- Dashboard -->
      <router-link
        to="/dashboard"
        :class="btnClass"
      >
        Dashboard
      </router-link>

      <!-- Cart -->
      <router-link
        to="/cart"
        :class="btnClass"
      >
        Cart ({{ cartStore.totalItems }})
      </router-link>

      <!-- Show username -->
      <span v-if="isLoggedIn" class="text-sm hidden md:block">
        Hi, {{ user?.firstName }}
      </span>

      <!-- Login / Logout -->
      <router-link
        v-if="!isLoggedIn"
        to="/login"
        :class="btnClass"
      >
        Login
      </router-link>

      <button
        v-else
        @click="logout"
        class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
      >
        Logout
      </button>

    </div>
  </nav>
</template>

<script setup lang="ts">
import { inject, type Ref, ref, onMounted } from "vue"
import { useCartStore } from "../stores/cart"

const isDark = inject<Ref<boolean>>("isDark")!
const toggleDarkMode = inject<() => void>("toggleDarkMode")!
const cartStore = useCartStore()

// login state
const isLoggedIn = ref(false)
const user = ref<any>(null)

// reusable class
const btnClass = isDark.value
  ? 'bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600'
  : 'bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100'

// check login on load
onMounted(() => {
  const token = localStorage.getItem("token")
  const storedUser = localStorage.getItem("user")

  if (token && storedUser) {
    isLoggedIn.value = true
    user.value = JSON.parse(storedUser)
  }
})

// logout function
function logout() {
  localStorage.removeItem("token")
  localStorage.removeItem("user")
  isLoggedIn.value = false
  user.value = null
}
</script>