<script setup lang="ts">
import { inject } from "vue"
const isDark = inject<boolean>("isDark", false)
</script>

<template>
  <footer :class="isDark ? 'bg-gray-900 border-t border-gray-700 text-gray-300' : 'bg-white border-t border-gray-200 text-gray-800'" class="pt-10 pb-6">
    <!-- Logo & Tagline -->
    <div class="text-center mb-8">
      <div class="flex items-center justify-center gap-2 mb-3">
        <img src="/ChatGPT Image Jul 22, 2026, 10_36_35 AM.png" alt="QuickBuy Logo" class="h-10 w-auto" />
        <span :class="isDark ? 'text-white' : 'text-gray-900'" class="text-2xl font-bold">QuickBuy</span>
      </div>
      <p :class="isDark ? 'text-gray-300' : 'text-gray-600'" class="text-sm max-w-lg mx-auto">
        Your premium destination for the latest gadgets, beauty, and lifestyle products.
        Quality guaranteed.
      </p>
    </div>

    <!-- Nav Links -->
    <div class="flex justify-center gap-16 mb-8 text-sm">
      <a href="#" :class="isDark ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-black'" class="transition">About Us</a>
      <a href="#" :class="isDark ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-black'" class="transition">Team</a>
      <a href="#" :class="isDark ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-black'" class="transition">FAQ</a>
      <a href="#" :class="isDark ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-black'" class="transition">Contact Us</a>
    </div>

    <!-- Social Icons (replace src with your image paths) -->
    <div class="flex justify-center gap-4 mb-8">
      <a href="#" :class="isDark ? 'border-gray-400 hover:bg-gray-800' : 'border-gray-800 hover:bg-gray-100'" class="w-9 h-9 border rounded flex items-center justify-center transition">
        <img src="/icons8-facebook-50.png" alt="Facebook" class="w-5 h-5" />
      </a>
      <a href="#" :class="isDark ? 'border-gray-400 hover:bg-gray-800' : 'border-gray-800 hover:bg-gray-100'" class="w-9 h-9 border rounded flex items-center justify-center transition">
        <img src="/instagram.png" alt="Instagram" class="w-5 h-5" />
      </a>
      <a href="#" :class="isDark ? 'border-gray-400 hover:bg-gray-800' : 'border-gray-800 hover:bg-gray-100'" class="w-9 h-9 border rounded flex items-center justify-center transition">
        <img src="/social.png" alt="LinkedIn" class="w-5 h-5" />
      </a>
      <a href="#" :class="isDark ? 'border-gray-400 hover:bg-gray-800' : 'border-gray-800 hover:bg-gray-100'" class="w-9 h-9 border rounded flex items-center justify-center transition">
        <img src="/twitter.png" alt="Twitter" class="w-5 h-5" />
      </a>
    </div>

    <!-- Copyright -->
    <div :class="isDark ? 'border-gray-700' : 'border-gray-200'" class="pt-4 text-center">
      <p :class="isDark ? 'text-gray-400' : 'text-gray-500'" class="text-sm">© 2026 QuickBuy. All Rights Reserved.</p>
    </div>
  </footer>
</template>