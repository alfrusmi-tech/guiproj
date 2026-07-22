<script setup lang="ts">
import { ref, onMounted, provide } from "vue"
import NavBar from "./components/NavBar.vue"
import Footer from "./components/Footer.vue"

const isDark = ref(false)

onMounted(() => {
  const savedTheme = localStorage.getItem("theme")
  isDark.value = savedTheme === "dark"
})

function toggleDarkMode() {
  isDark.value = !isDark.value
  localStorage.setItem("theme", isDark.value ? "dark" : "light")
}

provide("isDark", isDark)
provide("toggleDarkMode", toggleDarkMode)
</script>

<template>
  <div
    :class="isDark ? 'min-h-screen bg-gray-950 text-white' : 'min-h-screen bg-white text-black'"
  >
    <NavBar />
    <router-view />
    <Footer />
  </div>
</template>