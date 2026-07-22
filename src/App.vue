<script setup lang="ts">
import { ref, onMounted, provide, watch } from "vue"
import NavBar from "./components/NavBar.vue"
import Footer from "./components/Footer.vue"

const isDark = ref(false)

onMounted(() => {
  const savedTheme = localStorage.getItem("theme")
  isDark.value = savedTheme === "dark"
  applyDarkClass()
})

function toggleDarkMode() {
  isDark.value = !isDark.value
  localStorage.setItem("theme", isDark.value ? "dark" : "light")
  applyDarkClass()
}

// Apply 'dark' class to <html> so Tailwind dark: classes work everywhere
function applyDarkClass() {
  if (isDark.value) {
    document.documentElement.classList.add("dark")
  } else {
    document.documentElement.classList.remove("dark")
  }
}

watch(isDark, () => applyDarkClass())

provide("isDark", isDark)
provide("toggleDarkMode", toggleDarkMode)
</script>

<template>
  <div :class="isDark ? 'min-h-screen bg-gray-950 text-white' : 'min-h-screen bg-white text-black'">
    <NavBar />
    <router-view />
    <Footer />
  </div>
</template>