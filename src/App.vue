<script setup lang="ts">
import NavBar from "./components/NavBar.vue"
</script>

<template>
  <div class="min-h-screen bg-white text-black dark:bg-gray-950 dark:text-white transition-colors duration-300">
    <NavBar />
    <router-view />
  </div>
</template>
