<template>
  <nav class="bg-blue-600 dark:bg-gray-900 text-white p-4 flex justify-between items-center">
    <h1 class="text-xl font-bold">My SPA Store</h1>

    <div class="flex gap-3 items-center">
      <button
        @click="toggleDarkMode"
        class="bg-white dark:bg-gray-700 dark:text-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600"
      >
        {{ isDark ? "Light Mode" : "Dark Mode" }}
      </button>

      <router-link
        to="/dashboard"
        class="bg-white dark:bg-gray-700 dark:text-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600"
      >
        Dashboard
      </router-link>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"

const isDark = ref(false)

onMounted(() => {
  const savedTheme = localStorage.getItem("theme")

  if (savedTheme === "dark") {
    document.documentElement.classList.add("dark")
    isDark.value = true
  }
})

function toggleDarkMode() {
  isDark.value = !isDark.value

  if (isDark.value) {
    document.documentElement.classList.add("dark")
    localStorage.setItem("theme", "dark")
  } else {
    document.documentElement.classList.remove("dark")
    localStorage.setItem("theme", "light")
  }
}
</script>