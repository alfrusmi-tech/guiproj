<script setup lang="ts">
import { ref } from "vue"
import NavBar from "./components/NavBar.vue"

const search = ref("")
</script>

<template>
  <NavBar v-model:search="search" />

  <router-view v-slot="{ Component }">
    <component :is="Component" :search="search" />
  </router-view>
</template>

<style scoped>
</style>
